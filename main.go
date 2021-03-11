package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github/interview-api/models"
	"os"
	"time"

	"log"

	"net/http"

	"github.com/gorilla/mux"

	"github.com/rs/cors"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Gets all interviews from database
func getInterviews(w http.ResponseWriter, r *http.Request) {
	// set JSON header type
	w.Header().Set("Content-Type", "application/json")

	// establish which DB collection to query from
	collection := client.Database("interview-app").Collection("interviews")

	// db.collection.find returns a cursor, an iterable
	cursor, err := collection.Find(context.TODO(), bson.D{})

	// if no errors, iterate thru cursor and add elements to interviews
	if err != nil {
		fmt.Println("Finding all documents ERROR:", err)
		defer cursor.Close(ctx)
	} else {
		var interviews []models.Interview
		// iterate over docs using Next()
		for cursor.Next(ctx) {
			// Declare a result BSON object
			var result models.Interview
			err := cursor.Decode(&result)

			if err != nil {
				fmt.Println("cursor.Next() error:", err)
				os.Exit(1)
			} else {
				interviews = append(interviews, result)
			}
		}

		// encode and return interviews
		json.NewEncoder(w).Encode(interviews)
	}
}

// Get interview by id parameter
func getInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	filter := bson.D{{"id", params["id"]}}

	collection := client.Database("interview-app").Collection("interviews")

	var interview models.Interview

	err := collection.FindOne(context.TODO(), filter).Decode(&interview)
	if err != nil {
		fmt.Println("Finding document ERROR:", err)
		json.NewEncoder(w).Encode(&models.Interview{})
	} else {
		json.NewEncoder(w).Encode(interview)
	}

}

// get interviews by user ID
func getUserInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	collection := client.Database("interview-app").Collection("interviews")
	var interviews []models.Interview

	// filter via interviewee
	intervieweeFilter := bson.D{{"interviewee", params["id"]}}
	intervieweeCursor, err := collection.Find(context.TODO(), intervieweeFilter)

	if err != nil {
		fmt.Println("Finding all documents ERROR:", err)
		defer intervieweeCursor.Close(ctx)
	} else {
		for intervieweeCursor.Next(ctx) {
			var result models.Interview
			err := intervieweeCursor.Decode(&result)

			if err != nil {
				fmt.Println("cursor.Next() error:", err)
				os.Exit(1)

			} else {
				interviews = append(interviews, result)
			}
		}
	}

	// filter via interviewer
	interviewerFilter := bson.D{{"interviewer", params["id"]}}
	interviewerCursor, err := collection.Find(context.TODO(), interviewerFilter)

	if err != nil {
		fmt.Println("Finding all documents ERROR:", err)
		defer interviewerCursor.Close(ctx)
	} else {
		for interviewerCursor.Next(ctx) {
			var result models.Interview
			err := interviewerCursor.Decode(&result)

			if err != nil {
				fmt.Println("cursor.Next() error:", err)
				os.Exit(1)

			} else {
				interviews = append(interviews, result)
			}
		}
	}
	json.NewEncoder(w).Encode(interviews)
}

// Create an interview by decoding POSTed JSON via interview model
// Inserts into database afterwards
func createInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var interview models.Interview
	var err error
	_ = json.NewDecoder(r.Body).Decode(&interview)

	collection := client.Database("interview-app").Collection("interviews")
	_, err = collection.InsertOne(context.TODO(), interview)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(interview)
}

// Update interview by decoding PUTed JSON via interview model
func updateInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	filter := bson.D{{"id", params["id"]}}

	var interview models.Interview
	_ = json.NewDecoder(r.Body).Decode(&interview)

	update := bson.D{
		{
			"$set", bson.D{
				{"id", interview.ID},
				{"interviewer", interview.Interviewer},
				{"interviewee", interview.Interviewee},
				{"questionData", interview.QuestionData},
			},
		},
	}

	collection := client.Database("interview-app").Collection("interviews")
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

}

// Delete interviewe by id, no return
func deleteInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	filter := bson.D{{"id", params["id"]}}

	collection := client.Database("interview-app").Collection("interviews")

	err := collection.FindOneAndDelete(context.TODO(), filter)
	if err != nil {
		fmt.Println("Finding document ERROR:", err)
	} else {
		fmt.Println("Interview deleted")
	}

}

// Create schedule by decoding POSTed JSON via schedule model
func createSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var schedule models.Schedule

	_ = json.NewDecoder(r.Body).Decode(&schedule)
	var err error

	collection := client.Database("interview-app").Collection("schedule")
	_, err = collection.InsertOne(context.TODO(), schedule)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(schedule)

}

// Get all schedules
func getSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	collection := client.Database("interview-app").Collection("schedule")
	cursor, err := collection.Find(context.TODO(), bson.D{})

	if err != nil {
		fmt.Println("Finding all documents ERROR:", err)
		defer cursor.Close(ctx)
	} else {

		var schedules []models.Schedule
		for cursor.Next(ctx) {
			var result models.Schedule
			err := cursor.Decode(&result)

			if err != nil {
				fmt.Println("cursor.Next() error:", err)
				os.Exit(1)

			} else {
				schedules = append(schedules, result)
			}
		}
		json.NewEncoder(w).Encode(schedules)
	}
}

var client *mongo.Client
var ctx context.Context
var cancel context.CancelFunc

func main() {
	// DATABASE SET UP //
	var err error
	env := godotenv.Load()
	if env != nil {
		log.Fatal("Error loading .env file")
	}

	DB := os.Getenv("DBCONN")

	//// GCP SECRET MANAGER ////
	// // GCP project in which to store secrets in Secret Manager.
	// projectID := "interview-app-307320"

	// // Create the client.
	// ctx := context.Background()
	// client, err := secretmanager.NewClient(ctx)
	// if err != nil {
	// 	log.Fatalf("failed to setup client: %v", err)
	// }

	// // Create the request to create the secret.
	// createSecretReq := &secretmanagerpb.CreateSecretRequest{
	// 	Parent:   fmt.Sprintf("projects/%s", projectID),
	// 	SecretId: "my-secret",
	// 	Secret: &secretmanagerpb.Secret{
	// 		Replication: &secretmanagerpb.Replication{
	// 			Replication: &secretmanagerpb.Replication_Automatic_{
	// 				Automatic: &secretmanagerpb.Replication_Automatic{},
	// 			},
	// 		},
	// 	},
	// }

	// secret, err := client.CreateSecret(ctx, createSecretReq)
	// if err != nil {
	// 	log.Fatalf("failed to create secret: %v", err)
	// }

	// // Declare the payload to store.
	// payload := []byte("my super secret data")

	// // Build the request.
	// addSecretVersionReq := &secretmanagerpb.AddSecretVersionRequest{
	// 	Parent: secret.Name,
	// 	Payload: &secretmanagerpb.SecretPayload{
	// 		Data: payload,
	// 	},
	// }

	// // Call the API.
	// version, err := client.AddSecretVersion(ctx, addSecretVersionReq)
	// if err != nil {
	// 	log.Fatalf("failed to add secret version: %v", err)
	// }

	// // Build the request.
	// accessRequest := &secretmanagerpb.AccessSecretVersionRequest{
	// 	Name: version.Name,
	// }

	// // Call the API.
	// result, err := client.AccessSecretVersion(ctx, accessRequest)
	// if err != nil {
	// 	log.Fatalf("failed to access secret version: %v", err)
	// }

	// // Print the secret payload.
	// //
	// // WARNING: Do not print the secret in a production environment - this
	// // snippet is showing how to access the secret material.
	// log.Printf("Plaintext: %s", result.Payload.Data)

	// //// GCP SECRET MANAGER ////

	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(DB))
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	// DATABASE SET UP //

	router := mux.NewRouter()

	router.HandleFunc("/api/interviews", getInterviews).Methods("GET")
	router.HandleFunc("/api/interview/{id}", getInterview).Methods("GET")
	router.HandleFunc("/api/interview/user/{id}", getUserInterview).Methods("GET")
	router.HandleFunc("/api/interview", createInterview).Methods("POST")
	router.HandleFunc("/api/interview/{id}", updateInterview).Methods("PUT")
	router.HandleFunc("/api/interview/{id}", deleteInterview).Methods("DELETE")

	router.HandleFunc("/api/schedule", getSchedule).Methods("GET")
	router.HandleFunc("/api/schedule", createSchedule).Methods("POST")
	c := cors.New(cors.Options{
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut},
	})

	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(":8000", handler))
}
