package auth

import (
	"crypto/subtle"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/argon2"
)

const (
	keyLen  = 32
	timeP   = 1
	memory  = 64 * 1024
	threads = 4
)

func HashPassword(password string) (string, error) {
	// Simple implementation for demo/spec purposes
	// In a real app, generate a random salt
	salt := []byte("static_salt_for_demo")
	hash := argon2.IDKey([]byte(password), salt, timeP, memory, threads, keyLen)

	b64Salt := base64.RawStdEncoding.EncodeToString(salt)
	b64Hash := base64.RawStdEncoding.EncodeToString(hash)

	return fmt.Sprintf("$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s", memory, timeP, threads, b64Salt, b64Hash), nil
}

func ComparePassword(password, encodedHash string) (bool, error) {
	parts := strings.Split(encodedHash, "$")
	if len(parts) != 6 {
		return false, fmt.Errorf("invalid hash format")
	}

	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return false, err
	}

	decodedHash, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return false, err
	}

	hash := argon2.IDKey([]byte(password), salt, timeP, memory, threads, keyLen)

	if subtle.ConstantTimeCompare(hash, decodedHash) == 1 {
		return true, nil
	}
	return false, nil
}

func GenerateToken(userID uuid.UUID, cpf string, role string, secret string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID.String(),
		"cpf":     cpf,
		"role":    role,
		"exp":     time.Now().Add(time.Hour * 2).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
