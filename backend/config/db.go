package config

import (
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB conecta a la base de datos de Postgres usando GORM con reintentos.
func InitDB() *gorm.DB {
	host := getEnv("DB_HOST", "db")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "postgres")
	password := getEnv("DB_PASSWORD", "password")
	dbname := getEnv("DB_NAME", "reservas")

	dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=" + port + " sslmode=disable TimeZone=UTC"

	var db *gorm.DB
	var err error

	for i := 0; i < 15; i++ {
		log.Printf("Connecting to database... (attempt %d/15)", i+1)
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			log.Println("Successfully connected to database!")
			DB = db
			return db
		}
		log.Printf("Failed to connect to database: %v. Retrying in 3 seconds...", err)
		time.Sleep(3 * time.Second)
	}

	log.Fatalf("Could not connect to database after several attempts: %v", err)
	return nil
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
