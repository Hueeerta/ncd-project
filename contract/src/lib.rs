use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env,near_bindgen};

// Definition of the Busker Object with serde for JSON serialization on NEAR CLI and frontend 
#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Busker {
    pub account_id: String,
    pub name: String,
    pub category: String,
    pub location: String,
    pub img: String,
    pub qr: String
}

// Implement trait Default for initialize the Busker's structure 
impl Default for Busker {
    fn default() -> Self {
        Busker {
            account_id: String::from(""),
            name: String::from(""),
            category: String::from(""),
            location: String::from(""),
            img: String::from(""),
            qr: String::from("")
        }
    }
}

// Implement the method that will create new Buskers 
impl Busker {
    pub fn new(name: String, category: String, location: String, img: String, qr: String) -> Self {
        Self {
            account_id: env::signer_account_id().to_string(),
            name,
            category,
            location,
            img,
            qr
        }
    }
}

// Definition of the BuskerManager contract
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct BuskerManager {
  buskers_list: UnorderedMap<String,Busker>,
}

// Define the default, which automatically initializes the BuskerManager contract
impl Default for BuskerManager {
    fn default() -> Self {
        Self {
            // Initialization of the collection
            buskers_list: UnorderedMap::new(b"b".to_vec()),
        }
    }
}

// Implement the BuskerManager contract structure
#[near_bindgen]
impl BuskerManager {
    // Public method and mutable that creates a Busker and store it in the collections
    pub fn set_busker(&mut self, name: String, category: String, location: String, img: String, qr: String) -> bool {
        // Creation of the Busker object
        let busker: Busker = Busker::new(
            String::from(&name),
            String::from(&category),
            String::from(&location),
            String::from(&img),
            String::from(&qr)
        );

        // Check if the profile already exist
        if self.search_busker(busker.account_id.to_string()) {
            // Don't store the Busker in the Buskers collection. Return a log.
            env::log_str(
                format!("WARNING: Your busker profile already exist with {} account.", &busker.account_id).as_str(),
            );
            false
        } else {
            // Store the new Busker in the Buskers collection. Return a log.
            self.buskers_list.insert(&busker.account_id, &busker);
            env::log_str(
                format!("SUCCESS: New busker profile created with {} account", &busker.account_id).as_str(),
            );
            true
        }
    }

    // Read method that returns a vector with the collection of Buskers
    pub fn delete_busker(&mut self, account_id: String) -> bool {
        // Check if the profile exist
        if self.search_busker(account_id.to_string()) {
            // Delete the Busker profile from the Buskers collection. Return a log.
            self.buskers_list.remove(&account_id.to_string());
            env::log_str("SUCCESS: Your busker profile has been deleted successfully.");
            false
        } else {
            // We do nothing. The profile  Return a log.
            env::log_str(
                format!("ERROR: The {} account has not created a profile yet.", &account_id).as_str(),
            );
            true
        }
    }

    // Search if an accountId has already a profile created
    pub fn search_busker(&self, account_id: String) -> bool {
        // Search to find if this account Id already have a Busker profile in the collection
        let search = self.buskers_list.get(&account_id);
        search.is_some()
    }

    // Read method that returns a Busker
    pub fn get_busker(&self, account_id: String) -> Option<Busker> {
        // Search to find if this account Id already have a Busker profile in the collection
        let search = self.buskers_list.get(&account_id);
        if search.is_some() {
            env::log_str("SUCCESS: Busker profile founded.");
            Some(search.unwrap())
        } else {
            env::log_str("ERROR: Busker profile doesn't exist.");
            None
        }
    }

    // Read method that returns a vector with the collection of Buskers
    pub fn get_buskers(&self) -> Vec<Busker> {
        self.buskers_list.values_as_vector().to_vec()
    }
}