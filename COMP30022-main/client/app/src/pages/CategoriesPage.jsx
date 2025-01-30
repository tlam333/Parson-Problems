import React from 'react';
import NavHome from '../components/NavHome.jsx';
import Categories from '../components/Categories.jsx';

const CategoriesBody = () => {
    return (
        <div className="bg-black text-white flex flex-col items-center justify-center text-center font-sans">
        <div className="mb-8">
        <h1 className = "text-5xl font-bold">
            Problem <span className="text-orange-500">Categories</span>
        </h1>
        </div>
        </div>
    );
};

const categoriesData = [
    {
        title: "DataFrame",
        subtopic1: "Restuarant Inventory Management",
        subtopic2: "Personal Budget Tracking",
        subtopic3: "Sales Data Analysis",
        imgSrc: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhjZWx8ZW58MHx8MHx8fDI%3D",
    },
    {
        title: "NMI",
        subtopic1: "Social Media Content Analysis",
        subtopic2: "Customer Personal Preference",
        subtopic3: "Brand Perception and Analysis",
        imgSrc: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXhjZWx8ZW58MHx8MHx8fDI%3D",
    },
    {
        title: "Sentence Splitting",
        subtopic1: "Customer Review",
        subtopic2: "Legal Document Processing",
        subtopic3: "Natural Language Processing",
        imgSrc: "https://images.unsplash.com/photo-1610385983677-532611ff4ab2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3VtZW50fGVufDB8fDB8fHwy",
    },
    {
        title: "Correlation",
        subtopic1: "Marketing Campaign Effectiveness",
        subtopic2: "Health and LifeStyle",
        subtopic3: "Stock Market Analysis",
        imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvY3VtZW50fGVufDB8fDB8fHwy",
    },
    {
        title: "Linear Regression",
        subtopic1: "Employee Salary Prediction",
        subtopic2: "Estate Pricing",
        subtopic3: "Sales Forecasting",
        imgSrc: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Decision Tree Classifier",
        subtopic1: "Customer Churn Prediction",
        subtopic2: "Loan Approval Decision",
        subtopic3: "Disease Diagnosis",
        imgSrc: "https://images.unsplash.com/photo-1675495667069-d18d7d78eeb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
        title: "CSV",
        subtopic1: "Student Grades Management",
        subtopic2: "Employee Performance Records",
        subtopic3: "Sales Data Reporting",
        imgSrc: "https://images.unsplash.com/photo-1691458594499-c320c5e06d23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2xkJTIwZG9jdW1lbnR8ZW58MHx8MHx8fDI%3D",
    },
];


const CategoriesPage = () => {
    return (
        <>
        <NavHome/>
        <CategoriesBody/>
        <Categories categories={categoriesData}/>
        </>
    );
};

export default CategoriesPage;

