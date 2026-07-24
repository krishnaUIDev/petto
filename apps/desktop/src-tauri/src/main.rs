#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager, Window};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AdoptedPet {
    pub id: String,
    pub user_id: String,
    pub owner_name: String,
    pub name: String,
    pub species_id: String,
    pub species_name: String,
    pub birthday: String,
    pub personality: String,
    pub scale: f64,
    pub position_x: f64,
    pub position_y: f64,
    pub custom_manifest_json: Option<String>,
    pub certificate_data_url: Option<String>,
}

#[tauri::command]
fn set_ignore_cursor_events(window: Window, ignore: bool) -> Result<(), String> {
    window
        .set_ignore_cursor_events(ignore)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn start_window_drag(window: Window) -> Result<(), String> {
    window.start_dragging().map_err(|e| e.to_string())
}

fn get_app_data_file(app_handle: &AppHandle) -> Result<PathBuf, String> {
    let mut dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    if !dir.exists() {
        fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    }
    dir.push("pets.json");
    Ok(dir)
}

#[tauri::command]
fn save_pet_profile(app_handle: AppHandle, pet: AdoptedPet) -> Result<(), String> {
    let file_path = get_app_data_file(&app_handle)?;
    let mut pets = load_pet_profiles(app_handle.clone()).unwrap_or_default();
    
    // Replace existing or add new
    if let Some(pos) = pets.iter().position(|p| p.id == pet.id) {
        pets[pos] = pet;
    } else {
        pets.push(pet);
    }

    let json_data = serde_json::to_string_pretty(&pets).map_err(|e| e.to_string())?;
    fs::write(file_path, json_data).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn load_pet_profiles(app_handle: AppHandle) -> Result<Vec<AdoptedPet>, String> {
    let file_path = get_app_data_file(&app_handle)?;
    if !file_path.exists() {
        return Ok(Vec::new());
    }
    let content = fs::read_to_string(file_path).map_err(|e| e.to_string())?;
    let pets: Vec<AdoptedPet> = serde_json::from_str(&content).unwrap_or_default();
    Ok(pets)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            set_ignore_cursor_events,
            start_window_drag,
            save_pet_profile,
            load_pet_profiles
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
