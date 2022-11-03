use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env,near_bindgen};

// Definition of the Busker Object with serde for JSON serialization on NEAR CLI and frontend 
#[derive(Serialize, Deserialize, BorshSerialize, BorshDeserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Busker {
    pub id: u64,
    pub account_id: String,
    pub name: String
}

// Implement trait Default for initialize the Busker's structure 
impl Default for Busker {
    fn default() -> Self {
        Busker {
            id: 0,
            account_id: String::from(""),
            name: String::from("")
        }
    }
}

// Implement the method that will create new Buskers 
impl Busker {
    pub fn new(name: String) -> Self {
        Self {
            id: env::block_height(),
            account_id: env::signer_account_id().to_string(),
            name
        }
    }
}

// Definition of the BuskerManager contract
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct BuskerManager {
  buskers_list: UnorderedMap<u64,Busker>,
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
    pub fn set_busker(&mut self, name: String) {
        // Creation of the Busker object
        let busker: Busker = Busker::new(
            String::from(&name)
        );

        // Store the Busker in the Buskers collection
        self.buskers_list.insert(&busker.id, &busker);
    }

    // Read method that returns a vector with the collection of Buskers
    pub fn get_buskers(&self) -> Vec<Busker> {
        self.buskers_list.values_as_vector().to_vec()
    }
}