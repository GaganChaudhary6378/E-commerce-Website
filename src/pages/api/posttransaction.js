// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import React from "react"

export default function handler(req, res) {
  
    res.status(200).json({body:req.body})
  }
  
