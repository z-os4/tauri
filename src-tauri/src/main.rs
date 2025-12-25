//! zOS Tauri Shell - Minimal native wrapper
//!
//! Thin shell for running web-based zOS as a native app.
//! All OS logic runs in the browser - this just provides native API access.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn is_native() -> bool {
    true
}

fn main() {
    tauri::Builder::default()
        // Native API plugins - zOS can use these when running in Tauri
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![is_native])
        .setup(|app| {
            // Expose native context to web
            let window = app.get_webview_window("main").unwrap();
            window.eval("window.__TAURI_NATIVE__ = true").ok();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to run zOS shell");
}
