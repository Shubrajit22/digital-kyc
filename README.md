# Digital AI-Powered KYC Verification System

### Built with Next.js, TypeScript, Prisma, PostgreSQL, TailwindCSS & Gemini AI

This project is a complete end-to-end Digital KYC (Know Your Customer) Verification System designed to simulate real banking-grade onboarding. It verifies PAN and Aadhaar documents using AI, prevents duplicate KYCs, ensures secure validations, and provides a smooth multi-step user experience optimized for mobile and web.

---

# Key Features

## 1. AI-Based PAN & Aadhaar Verification

* Uses Gemini 2.5 Flash Vision to:

  * Identify whether the uploaded document is real
  * Match PAN number against the actual document
  * Match Aadhaar number against its scanned image
  * Extract and verify the name on the document
  * Detect unclear, blurred, or tampered images
* Validation is performed server-side for maximum security.

---

## 2. Duplicate KYC Detection

After entering the basic details (full name + email), the backend checks if the customer has:

* An existing KYC application
* An existing submitted application
* Matching records based on name/email

If found:

* User is redirected to a dedicated "KYC Already Exists" page
* Existing Application ID is displayed
* User can proceed or return home

This prevents unnecessary re-submissions.

---

## 3. Step-by-Step Guided KYC Flow

The system includes:

1. Basic Details & Duplicate Check
2. PAN Upload & Validation
3. Aadhaar Upload & Validation
4. Photo & Signature Upload
5. Review Page
6. Processing Screen
7. Success or Error Page

Each step is clearly designed with a progress indicator.

---

## 4. Smart Upload Box with Visual Validation

* Upload box turns green when:

  * The file is valid
  * The size is less than 5 MB
  * AI validation passes
* Reduces confusion and improves user confidence.

---

## 5. Attempt Protection System

To prevent misuse and repeated invalid uploads:

* 5 attempts are allowed per document
* Every failed AI validation increases the attempt count
* After 5 failed attempts, the user is locked out and redirected to the home page
* Attempts reset only when a new KYC process starts

---

## 6. Background Processing and Status Polling

Once the final KYC is submitted:

* Data is stored in the database as PENDING
* The user is taken to a "Processing" page
* The frontend checks the status every 2 seconds through `/api/kyc/status`
* If the status becomes APPROVED → Success page
* If the status becomes REJECTED → Error page

This simulates real banking processes.

---

## 7. Mobile-Optimized User Interface

* Responsive design
* Large touch-friendly buttons
* Clean layout spacing
* Optimized upload boxes
* Works smoothly across all screen sizes

---

## 8. Secure File Storage

All uploaded documents are converted into Base64 and stored in PostgreSQL:

* PAN
* Aadhaar (front and back)
* Photograph
* Signature

This facilitates future audit or re-verification processes.

---

# Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | Next.js 14, TypeScript, TailwindCSS |
| Backend       | Next.js API Route Handlers          |
| Database      | PostgreSQL with Prisma ORM          |
| AI Engine     | Google Gemini 2.5 Flash Vision      |
| Storage       | Base64 inside PostgreSQL            |
| Status Engine | API polling                         |
| Deployment    | Vercel / Railway / Render           |

---

# Security Features

* AI validation only on backend
* Attempt-limit system
* Duplicate KYC detection
* File size and MIME-type validation
* Clean input sanitation
* Safe handling of Base64-encoded documents
* Zero client-side sensitive storage

---

# How This Prototype Solves Real Banking Problems

## Reduces Failure Rates Across KYC Stages

| Stage                | Industry Failure Rate | Improvement in Prototype                           |
| -------------------- | --------------------- | -------------------------------------------------- |
| Select Document Type | 15%                   | Clear step-by-step flow removes confusion          |
| Scan Document        | 35%                   | AI detects blur, mismatch, incorrect uploads early |
| Upload Document      | 25%                   | Green-state validation ensures proper upload       |
| KYC Check            | 15%                   | AI name and number matching reduces human error    |
| KYC Approval         | 10%                   | Pre-approved validation reduces re-verification    |

---

# Reduces Abandonment and Improves TAT

* Clear visibility of each step
* Real-time validation eliminates waiting
* Mobile-first UI reduces drop-offs
* Status polling simulates real processing
* Review screen minimizes re-submissions

---

# Future Enhancements

* Selfie verification with face-matching
* Passport verification with validity check
* Support for additional documents:

  * Passport
  * Voter ID
  * Driving License
* OCR auto-fill for PAN and Aadhaar
* Liveliness detection
* Notification system (SMS/Email)
* Admin dashboard for reviewing KYC
* Retry after cooldown mechanism

---

# Folder Structure

```
/app
   /kyc
      basic-details
      pan-upload
      aadhaar-upload
      photo-signature
      review
      processing
      success
      error
      already-exists
   /api/kyc
      validate-pan
      validate-aadhaar
      submit
      status
/lib
   prisma
```

---

# Conclusion

This AI-driven Digital KYC System demonstrates how a modern bank can:

* Reduce error rates
* Prevent duplicate applications
* Improve user experience
* Speed up end-to-end verification
* Deliver a secure, scalable, production-ready KYC flow

This prototype is suitable for real-world banking environments and can be extended into a full enterprise application.

---

