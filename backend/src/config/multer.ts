import multer from "multer";

// Multer para armazenar arquivo na memória
export const upload = multer({ storage: multer.memoryStorage() });