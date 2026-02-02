import React from "react";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";




const app = express();
app.use(express.json());

dotenv.config();