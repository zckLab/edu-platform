package main

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/zcklab/led-backend/internal/database"
	"github.com/zcklab/led-backend/internal/handlers"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Initialize Database
	database.InitDB()

	app := fiber.New()

	// Middleware
	app.Use(logger.New())

	// Rate Limiting
	app.Use(limiter.New(limiter.Config{
		Max:        5,
		Expiration: 1 * time.Minute,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
	}))

	// Routes
	authGroup := app.Group("/auth")
	authGroup.Post("/login", handlers.Login)

	financeGroup := app.Group("/finance")
	financeGroup.Get("/invoices", handlers.GetInvoices)

	// Admin Area
	adminGroup := app.Group("/admin")
	adminGroup.Use(handlers.AdminMiddleware)
	adminGroup.Get("/users", handlers.ListUsers)
	adminGroup.Post("/users/:user_id/reset-password", handlers.ResetPassword)
	adminGroup.Post("/users/import", handlers.ImportUsersCSV)

	paymentGroup := app.Group("/payments")
	paymentGroup.Post("/preference/:invoice_id", handlers.CreatePaymentPreference)

	app.Post("/webhooks/mercadopago", handlers.WebhookMercadoPago)

	// SuperAdmin SaaS Owner Area
	saGroup := app.Group("/superadmin")
	saGroup.Use(handlers.SuperAdminMiddleware)
	saGroup.Get("/stats", handlers.GetSaaSStats)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
