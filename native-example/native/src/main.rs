use std::io::{self};
// use std::io::{Read, Write};
use chrome_native_messaging::{send, read_input};
use serde_json::json;

fn main() {
    // let _msg = read_input().unwrap();
    // write_output("{\"from_native\":\"pong\"}").unwrap();
    let msg = read_input(io::stdin()).expect("doctest should return unexpected eof");
    send!({ "same_msg_from_native": msg }).unwrap();
}

// pub fn read_input() -> io::Result<Vec<u8>> {
//     let mut instream = io::stdin();
//     let mut length = [0; 4];
//     instream.read(&mut length)?;
//     let mut buffer = vec![0; u32::from_ne_bytes(length) as usize];
//     instream.read_exact(&mut buffer)?;
//     Ok(buffer)
// }

// pub fn write_output(msg: &str) -> io::Result<()> {
//     let mut outstream = io::stdout();
//     let len = msg.len();
//     if len > 1024 * 1024 {
//         panic!("Message was too large, length: {}", len)
//     }
//     outstream.write(&len.to_ne_bytes())?;
//     outstream.write_all(msg.as_bytes())?;
//     outstream.flush()?;
//     Ok(())
// }