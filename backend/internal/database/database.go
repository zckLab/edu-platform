package database

import (
	"fmt"
	"log"
	"os"

	"github.com/zcklab/led-backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		host := os.Getenv("DB_HOST")
		user := os.Getenv("DB_USER")
		pass := os.Getenv("DB_PASSWORD")
		dbnm := os.Getenv("DB_NAME")
		port := os.Getenv("DB_PORT")
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, pass, dbnm, port)
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("⚠️ WARNING: Failed to connect to database: %v", err)
		log.Println("👉 Server will continue in DEMO MODE (endpoints requiring DB will fail)")
		return
	}

	// Auto Migration
	err = db.AutoMigrate(&models.User{}, &models.Invoice{}, &models.AuditLog{})
	if err != nil {
		log.Printf("⚠️ WARNING: Failed to migrate database: %v", err)
	}

	DB = db
}
