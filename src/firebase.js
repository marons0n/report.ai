// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnufh3zacSHl7sQkGzkjihD18BafWuKAg",
  authDomain: "gen-lang-client-0170544513.firebaseapp.com",
  projectId: "gen-lang-client-0170544513",
  storageBucket: "gen-lang-client-0170544513.firebasestorage.app",
  messagingSenderId: "477869235774",
  appId: "1:477869235774:web:d09014438af23fe2003b6f",
  measurementId: "G-BR4ZERKP00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Helper functions for managing report counts and statistics
const STATS_DOC_ID = 'statistics';

// Initialize the statistics document if it doesn't exist
async function initializeStatistics() {
  try {
    const docRef = doc(db, 'statistics', STATS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Create the initial document
      await setDoc(docRef, {
        totalReports: 0,
        lastReportTimestamp: serverTimestamp(),
        reportsByMonth: {}
      });
      console.log('Statistics document initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing statistics:', error);
  }
}

// Call this when the app starts
initializeStatistics();

// Get the reports statistics
async function getReportStats() {
  const docRef = doc(db, 'statistics', STATS_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // Initialize the document if it doesn't exist
    await initializeStatistics();
    return {
      totalReports: 0,
      lastReportTimestamp: null,
      reportsByMonth: {}
    };
  }

  return docSnap.data();
}

// Record a new report
async function recordNewReport() {
  try {
    const docRef = doc(db, 'statistics', STATS_DOC_ID);
    const currentDate = new Date();
    const monthKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

    await updateDoc(docRef, {
      totalReports: increment(1),
      lastReportTimestamp: serverTimestamp(),
      [`reportsByMonth.${monthKey}`]: increment(1)
    });

    console.log('Report recorded successfully');
    return await getReportStats();
  } catch (error) {
    console.error('Error recording report:', error);
    // If the document doesn't exist, try to initialize it and then record the report
    if (error.code === 'not-found') {
      await initializeStatistics();
      return recordNewReport();
    }
    throw error;
  }
}

// Add this for testing in the browser console
if (typeof window !== 'undefined') {
  window.firebaseTest = { getReportStats, recordNewReport, initializeStatistics };
}

export { app, analytics, db, getReportStats, recordNewReport }; 