package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"log"

	"net/http"

	"github.com/gorilla/mux"

	"github.com/jimmyjongs/interview-api/models"

	"github.com/rs/cors"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// init users as User slice (list)
var users []string

// var interviews []models.Interview

var schedules models.Schedule

// API for interviews
func getInterviews(w http.ResponseWriter, r *http.Request) {
	// set header
	w.Header().Set("Content-Type", "application/json")

	collection := client.Database("interview-app").Collection("interviews")
	cursor, err := collection.Find(context.TODO(), bson.D{})

	// Find() method raised an error
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

			// If there is a cursor.Decode error
			if err != nil {
				fmt.Println("cursor.Next() error:", err)
				os.Exit(1)

				// If there are no cursor.Decode errors
			} else {
				interviews = append(interviews, result)
				// fmt.Println("\nresult type:", reflect.TypeOf(result))
				// fmt.Println("result:", result)
			}
		}
		// //encode users into json
		json.NewEncoder(w).Encode(interviews)
	}
}

func getInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
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
// currently useless with user Strings
// func getUserInterview(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 		// get params
// 		params := mux.Vars(r)

// 		filter := bson.D{{"id", params["id"]}}

// 		collection := client.Database("interview-app").Collection("interviews")

// 		var interview models.Interview

// 		err := collection.FindOne(context.TODO(), filter).Decode(&interview)
// 		if err != nil {
// 			fmt.Println("Finding document ERROR:", err)
// 			json.NewEncoder(w).Encode(&models.Interview{})
// 		} else {
// 			json.NewEncoder(w).Encode(interview)
// 		}

// }

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

func updateInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
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

func deleteInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
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

func createSchedule(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var schedule models.Schedule

	_ = json.NewDecoder(r.Body).Decode(&schedule)

	schedules = append(schedules, schedule...)
	json.NewEncoder(w).Encode(schedule)

}

func getSchedule(w http.ResponseWriter, r *http.Request) {
	// set header
	w.Header().Set("Content-Type", "application/json")

	//encode users into json
	json.NewEncoder(w).Encode(schedules)
}

var client *mongo.Client
var ctx context.Context
var cancel context.CancelFunc

func main() {

	fmt.Println("Hello World")

	//// DATABASE SET UP
	var err error
	env := godotenv.Load()
	if env != nil {
		log.Fatal("Error loading .env file")
	}
	DB := os.Getenv("DBCONN")

	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(DB))
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	//// DATABASE SET UP

	// init mux router
	router := mux.NewRouter()

	router.HandleFunc("/api/interviews", getInterviews).Methods("GET")
	router.HandleFunc("/api/interview/{id}", getInterview).Methods("GET")
	// router.HandleFunc("/api/interview/user/{id}", getUserInterview).Methods("GET")
	router.HandleFunc("/api/interview", createInterview).Methods("POST")
	router.HandleFunc("/api/interview/{id}", updateInterview).Methods("PUT")
	router.HandleFunc("/api/interview/{id}", deleteInterview).Methods("DELETE")

	router.HandleFunc("/api/schedule", getSchedule).Methods("GET")
	router.HandleFunc("/api/schedule", createSchedule).Methods("POST")
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":8000", handler))
}
