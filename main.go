package main

import (
	"encoding/json"

	"log"

	"net/http"

	"github.com/gorilla/mux"

	"github.com/jimmyjongs/interview-api/models"

	"github.com/rs/cors"
)

// init users as User slice (list)
var users []string

var interviews []models.Interview

var schedules models.Schedule

// func getUsers(w http.ResponseWriter, r *http.Request) {
// 	// set header
// 	w.Header().Set("Content-Type", "application/json")

// 	//encode users into json
// 	json.NewEncoder(w).Encode(users)
// }

// func getUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	// get params
// 	params := mux.Vars(r)

// 	// loop thhru users, find with idinterviews
// 	// for _ + for item in users
// 	for _, item := range users {
// 		if item.ID == params["id"] {
// 			json.NewEncoder(w).Encode(item)
// 			return
// 		}
// 	}

// 	json.NewEncoder(w).Encode(&models.User{})

// }

// func createUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	var user models.User
// 	_ = json.NewDecoder(r.Body).Decode(&user)

// 	user.ID = strconv.Itoa(rand.Intn(1000000))

// 	users = append(users, user)
// 	json.NewEncoder(w).Encode(user)

// }

// // // combintation of delete + create
// func updateUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	// get params
// 	params := mux.Vars(r)

// 	for index, item := range users {
// 		if item.ID == params["id"] {
// 			// delete's slice
// 			users = append(users[:index], users[index+1:]...)

// 			// create's creation
// 			var user models.User
// 			_ = json.NewDecoder(r.Body).Decode(&user)

// 			user.ID = params["id"]
// 			users = append(users, user)
// 			json.NewEncoder(w).Encode(user)
// 			return
// 		}
// 	}
// 	json.NewEncoder(w).Encode(users)
// }

// func deleteUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	// get params
// 	params := mux.Vars(r)

// 	for index, item := range users {
// 		if item.ID == params["id"] {
// 			users = append(users[:index], users[index+1:]...)
// 			break
// 		}
// 	}
// 	json.NewEncoder(w).Encode(users)
// }

// API for interviews
func getInterviews(w http.ResponseWriter, r *http.Request) {
	// set header
	w.Header().Set("Content-Type", "application/json")

	//encode users into json
	json.NewEncoder(w).Encode(interviews)
}

func getInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
	params := mux.Vars(r)

	// loop thhru users, find with id
	// for _ + for item in users
	for _, item := range interviews {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	json.NewEncoder(w).Encode(&models.Interview{})
}

// get interviews by user ID
// currently useless with user Strings
// func getUserInterview(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	// get params
// 	params := mux.Vars(r)

// 	// loop thhru users, find with id
// 	// for _ + for item in users
// 	var temp []models.Interview

// 	for _, item := range interviews {
// 		for _, each := range item.Party {
// 			if each.ID == params["id"] {
// 				temp = append(temp, item)
// 			}
// 		}

// 	}

// 	json.NewEncoder(w).Encode(&temp)

// }

func createInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var interview models.Interview
	_ = json.NewDecoder(r.Body).Decode(&interview)

	interviews = append(interviews, interview)
	json.NewEncoder(w).Encode(interview)

}

func updateInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
	params := mux.Vars(r)

	for index, item := range interviews {
		if item.ID == params["id"] {
			// delete's slice
			interviews = append(interviews[:index], interviews[index+1:]...)

			// create's creation
			var interview models.Interview
			_ = json.NewDecoder(r.Body).Decode(&interview)

			interview.ID = params["id"]
			interviews = append(interviews, interview)
			json.NewEncoder(w).Encode(interview)
			return
		}
	}
	json.NewEncoder(w).Encode(interviews)
}

func deleteInterview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
	params := mux.Vars(r)

	for index, item := range interviews {
		if item.ID == params["id"] {
			interviews = append(interviews[:index], interviews[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(interviews)
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

func main() {
	// init mux router
	router := mux.NewRouter()

	// dummy data @ todo - implement DB

	users = append(users, "Bob")
	users = append(users, "Alice")
	users = append(users, "Carrot")
	users = append(users, "Dan")

	// interviews = append(interviews, genInterviews(10)...)

	// @ TODO: Figure out interview struct inside User struct

	// user route handlers / endpoints
	// router.HandleFunc("/api/users", getUsers).Methods("GET")
	// router.HandleFunc("/api/user/{id}", getUser).Methods("GET")
	// router.HandleFunc("/api/user", createUser).Methods("POST")
	// router.HandleFunc("/api/user/{id}", updateUser).Methods("PUT")
	// router.HandleFunc("/api/user/{id}", deleteUser).Methods("DELETE")

	router.HandleFunc("/api/interviews", getInterviews).Methods("GET")
	router.HandleFunc("/api/interview/{id}", getInterview).Methods("GET")
	// router.HandleFunc("/api/interview/user/{id}", getUserInterview).Methods("GET")
	router.HandleFunc("/api/interview", createInterview).Methods("POST")
	// router.HandleFunc("/api/interview/{id}", updateInterview).Methods("PUT")
	// router.HandleFunc("/api/interview/{id}", deleteInterview).Methods("DELETE")

	router.HandleFunc("/api/schedule", getSchedule).Methods("GET")
	router.HandleFunc("/api/schedule", createSchedule).Methods("POST")
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":8000", handler))
}
