use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

// Definition of the BuskerManager contract
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct BuskerManager {
  pub buskers_list: String,
}

// Define the default, which automatically initializes the BuskerManager contract
impl Default for BuskerManager {
    fn default() -> Self{
        Self {
            // Initialization of the collection
            buskers_list: String::from("Ejemplo"),
        }
    }
}

// Implement the BuskerManager contract structure
#[near_bindgen]
impl BuskerManager {
    // Read method that returns a vector with the collection of Buskers
    pub fn get_buskers(&self) -> String {
        self.buskers_list.to_string()
    }
}