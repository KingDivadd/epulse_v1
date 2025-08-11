export const handle_encrypt = async (data: string) => {

    try {

        const passphrase = process.env.NEXT_PUBLIC_PASSPHRASE;


        if (!passphrase) {

            return {msg: "Passphrase not found", status: 404}

        }

        const textEncoder = new TextEncoder();

        const encodedData = textEncoder.encode(data);

        const passphrase_buffer = new TextEncoder().encode(passphrase);

        const hash_buffer = await crypto.subtle.digest('SHA-256', passphrase_buffer);

        const iv = new Uint8Array(hash_buffer.slice(0, 16));

        const imported_key = await crypto.subtle.importKey(
            "raw",
            textEncoder.encode(passphrase),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );

        const key = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: new Uint8Array([]), 
                iterations: 100000,
                hash: "SHA-256"
            },
            imported_key,
            { name: "AES-CBC", length: 256 },
            true,
            ["encrypt"]
        );

        const encrypted = await crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv: iv,
            },
            key,
            encodedData
        );

        const encryptedData = btoa(String.fromCharCode(...Array.from(new Uint8Array(encrypted))));
        
        return {msg:encryptedData, status: 200}
        
        } catch (error) {

        console.error("Encryption failed:", error);
        
    }
    
}