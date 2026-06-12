package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/spergio/reservas-backend/handlers"
	"github.com/spergio/reservas-backend/middleware"
)

// SetupRouter configura el enrutador de Gin, registra los middlewares y endpoints.
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Aplicar CORS
	router.Use(middleware.CORSMiddleware())

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	// Agrupamiento API de rutas Todo
	api := router.Group("/api")
	{
		api.GET("/todos", handlers.GetTodos)
		api.POST("/todos", handlers.CreateTodo)
		api.PUT("/todos/:id", handlers.UpdateTodo)
		api.DELETE("/todos/:id", handlers.DeleteTodo)
	}

	return router
}
