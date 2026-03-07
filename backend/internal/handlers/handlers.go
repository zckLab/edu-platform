package handlers

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mercadopago/sdk-go/pkg/config"
	"github.com/mercadopago/sdk-go/pkg/preference"
	"github.com/zcklab/led-backend/internal/auth"
	"github.com/zcklab/led-backend/internal/database"
	"github.com/zcklab/led-backend/internal/models"
)

type LoginRequest struct {
	CPF      string `json:"cpf"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request body"})
	}

	if database.DB == nil {
		return c.Status(503).JSON(fiber.Map{"error": "database offline: system in demo mode"})
	}

	var user models.User
	if err := database.DB.Where("cpf = ?", req.CPF).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "user not found"})
	}

	match, err := auth.ComparePassword(req.Password, user.PasswordHash)
	if err != nil || !match {
		return c.Status(401).JSON(fiber.Map{"error": "invalid credentials"})
	}

	token, err := auth.GenerateToken(user.ID, user.CPF, string(user.Role), os.Getenv("JWT_SECRET"))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to generate token"})
	}

	return c.JSON(fiber.Map{
		"token": token,
		"user":  user,
	})
}

func GetInvoices(c *fiber.Ctx) error {
	// In a real app, extract user_id from JWT locals
	userID := c.Locals("user_id").(string)

	if database.DB == nil {
		return c.Status(503).JSON(fiber.Map{"error": "database offline: system in demo mode"})
	}

	var invoices []models.Invoice
	if err := database.DB.Where("user_id = ?", userID).Find(&invoices).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch invoices"})
	}

	now := time.Now()
	for i := range invoices {
		// Regra de Negócio: Se a data atual > data de vencimento, o valor deve ser R$ 500,00
		if invoices[i].Status != models.StatusPaid && now.After(invoices[i].DueDate) {
			invoices[i].Amount = 500.00
			invoices[i].Status = models.StatusOverdue
		}
	}

	return c.JSON(invoices)
}

func CreatePaymentPreference(c *fiber.Ctx) error {
	invoiceID := c.Params("invoice_id")
	var invoice models.Invoice
	if err := database.DB.First(&invoice, "id = ?", invoiceID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "invoice not found"})
	}

	// Dynamic Fine Logic
	amount := invoice.Amount
	if invoice.Status != models.StatusPaid && time.Now().After(invoice.DueDate) {
		amount = 500.00
	}

	accessToken := os.Getenv("MP_ACCESS_TOKEN")
	cfg, _ := config.New(accessToken)
	client := preference.NewClient(cfg)

	prefReq := preference.Request{
		Items: []preference.ItemRequest{
			{
				ID:         invoice.ID.String(),
				Title:      invoice.Description,
				Quantity:   1,
				UnitPrice:  amount,
				CurrencyID: "BRL",
			},
		},
		ExternalReference: invoice.ID.String(),
		NotificationURL:   fmt.Sprintf("%s/webhooks/mercadopago", os.Getenv("BASE_URL")),
	}

	resource, err := client.Create(context.Background(), prefReq)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to create MP preference"})
	}

	// Store Preference ID
	database.DB.Model(&invoice).Update("mp_preference_id", resource.ID)

	return c.JSON(fiber.Map{
		"init_point":    resource.InitPoint,
		"preference_id": resource.ID,
	})
}

func WebhookMercadoPago(c *fiber.Ctx) error {
	// Simple simulation of webhook handling
	// In a real app, validate signature and fetch payment status
	paymentID := c.Query("data.id")
	if paymentID == "" {
		return c.SendStatus(200)
	}

	// This is a placeholder for real MP payment verification logic
	// If payment is approved:
	// database.DB.Model(&models.Invoice{}).Where("mp_preference_id = ?", preferenceID).Updates(...)

	return c.SendStatus(200)
}

// Admin Handlers

func AdminMiddleware(c *fiber.Ctx) error {
	role := c.Locals("role").(string)
	if role != string(models.RoleAdmin) && role != string(models.RoleSuperAdmin) {
		return c.Status(403).JSON(fiber.Map{"error": "access denied: admin only"})
	}
	return c.Next()
}

func SuperAdminMiddleware(c *fiber.Ctx) error {
	role := c.Locals("role").(string)
	if role != string(models.RoleSuperAdmin) {
		return c.Status(403).JSON(fiber.Map{"error": "access denied: superadmin only"})
	}
	return c.Next()
}

func ListUsers(c *fiber.Ctx) error {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to status fetch users"})
	}
	return c.JSON(users)
}

func ResetPassword(c *fiber.Ctx) error {
	userID := c.Params("user_id")
	var req struct {
		NewPassword string `json:"new_password"`
	}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request"})
	}

	hash, _ := auth.HashPassword(req.NewPassword)
	if err := database.DB.Model(&models.User{}).Where("id = ?", userID).Update("password_hash", hash).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to reset password"})
	}

	return c.JSON(fiber.Map{"message": "password reset successfully"})
}

func ImportUsersCSV(c *fiber.Ctx) error {
	// Implement CSV parsing and batch insert
	return c.JSON(fiber.Map{"message": "import functionality ready for implementation"})
}

// SuperAdmin Handlers

func GetSaaSStats(c *fiber.Ctx) error {
	var studentCount int64
	database.DB.Model(&models.User{}).Where("role = ?", models.RoleStudent).Count(&studentCount)

	// Regra de Negócio SaaS: R$ 25,00 por aluno ativo
	billingAmount := float64(studentCount) * 25.0

	return c.JSON(fiber.Map{
		"total_students": studentCount,
		"billing_amount": billingAmount,
		"currency":       "BRL",
		"month":          time.Now().Format("January 2006"),
	})
}
