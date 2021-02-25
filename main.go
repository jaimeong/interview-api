package main

import (
	"encoding/json"
	"math/rand"

	"log"

	"net/http"

	"github.com/gorilla/mux"

	"fmt"

	"strconv"

	"github.com/jimmyjongs/inter/models"
)

// init users as User slice (list)
var users []models.User

func getUsers(w http.ResponseWriter, r *http.Request) {
	// set header
	w.Header().Set("Content-Type", "application/json")

	//encode users into json
	json.NewEncoder(w).Encode(users)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
	params := mux.Vars(r)

	// loop thhru users, find with id
	// for _ + for item in users
	for _, item := range users {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	json.NewEncoder(w).Encode(&models.User{})

}

func createUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)

	user.ID = strconv.Itoa(rand.Intn(1000000))

	users = append(users, user)
	json.NewEncoder(w).Encode(user)

}

// // combintation of delete + create
func updateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
	params := mux.Vars(r)

	for index, item := range users {
		if item.ID == params["id"] {
			// delete's slice
			users = append(users[:index], users[index+1:]...)

			// create's creation
			var user models.User
			_ = json.NewDecoder(r.Body).Decode(&user)

			user.ID = params["id"]
			users = append(users, user)
			json.NewEncoder(w).Encode(user)
			return
		}
	}
	json.NewEncoder(w).Encode(users)
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get params
	params := mux.Vars(r)

	for index, item := range users {
		if item.ID == params["id"] {
			users = append(users[:index], users[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(users)
}

// generate dummy interview data
func genInterviews(n int) []models.Interview {
	// generate interviews
	tmp := make([]models.Interview, n)
	usersList := make([]models.User, 1)
	usersList = append(usersList, users...)

	for i := range tmp {
		tmp[i].Date = strconv.Itoa(rand.Intn(100))
		tmp[i].Party = usersList
		tmp[i].Score = rand.Float32() * 5
	}
	return tmp
}

//  choose random user from users slice

func main() {
	// init mux router
	router := mux.NewRouter()

	// dummy data @ todo - implement DB

	users = append(users, models.User{
		ID:         "1",
		Firstname:  "John",
		Lastname:   "Smith",
		Interviews: genInterviews(2),
	})

	users = append(users, models.User{
		ID:         "2",
		Firstname:  "Jane",
		Lastname:   "Doe",
		Interviews: genInterviews(1),
	})

	users = append(users, models.User{
		ID:         "3",
		Firstname:  "Sam",
		Lastname:   "Thi",
		Interviews: genInterviews(3),
	})

	// @ TODO: Figure out interview struct inside User struct

	// user route handlers / endpoints
	router.HandleFunc("/api/users", getUsers).Methods("GET")
	router.HandleFunc("/api/user/{id}", getUser).Methods("GET")
	router.HandleFunc("/api/user", createUser).Methods("POST")
	router.HandleFunc("/api/user/{id}", updateUser).Methods("PUT")
	router.HandleFunc("/api/user/{id}", deleteUser).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", router))
	fmt.Println("Server listening on :8000")
}
