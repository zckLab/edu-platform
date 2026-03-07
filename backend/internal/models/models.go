package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRole string

const (
	RoleStudent    UserRole = "student"
	RoleAdmin      UserRole = "admin"
	RoleSuperAdmin UserRole = "superadmin"
)

type InvoiceStatus string

const (
	StatusPaid    InvoiceStatus = "paid"
	StatusPending InvoiceStatus = "pending"
	StatusOverdue InvoiceStatus = "overdue"
)

type User struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CPF             string    `gorm:"uniqueIndex;not null;size:11" json:"cpf"`
	PasswordHash    string    `gorm:"not null" json:"-"`
	FullName        string    `gorm:"size:255;not null" json:"full_name"`
	Email           string    `gorm:"size:255" json:"email"`
	Role            UserRole  `gorm:"type:varchar(20);default:'student'" json:"role"`
	ThemePreference string    `gorm:"default:'light'" json:"theme_preference"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
	Invoices        []Invoice `json:"invoices,omitempty"`
}

type Invoice struct {
	ID             uuid.UUID     `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID         uuid.UUID     `gorm:"type:uuid;index;not null" json:"user_id"`
	Description    string        `gorm:"size:255" json:"description"`
	Amount         float64       `gorm:"type:decimal(10,2);default:300.00" json:"amount"`
	DueDate        time.Time     `gorm:"not null" json:"due_date"`
	Status         InvoiceStatus `gorm:"type:varchar(20);default:'pending'" json:"status"`
	MPPreferenceID string        `json:"mp_preference_id,omitempty"`
	PaidAt         *time.Time    `json:"paid_at,omitempty"`
	CreatedAt      time.Time     `json:"created_at"`
	UpdatedAt      time.Time     `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

func (i *Invoice) BeforeCreate(tx *gorm.DB) error {
	if i.ID == uuid.Nil {
		i.ID = uuid.New()
	}
	return nil
}

type AuditLog struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Event     string    `gorm:"size:100;not null" json:"event"` // e.g., "payment_approved", "user_created"
	Message   string    `gorm:"type:text" json:"message"`
	UserID    uuid.UUID `gorm:"type:uuid;index" json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}
