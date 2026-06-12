package main

import (
	"log"
	"os"

	"github.com/spergio/reservas-backend/config"
	"github.com/spergio/reservas-backend/models"
	"github.com/spergio/reservas-backend/routes"
)

func main() {
	// 1. Inicializar Base de Datos
	db := config.InitDB()

	// 2. Ejecutar Migraciones de Esquema de base de datos
	log.Println("Running database migrations...")
	if err := db.AutoMigrate(&models.Todo{}); err != nil {
		log.Fatalf("Failed to run database migrations: %v", err)
	}

	// 3. Configurar Rutas y Servidor
	router := routes.SetupRouter()

	// 4. Iniciar Servidor
	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
