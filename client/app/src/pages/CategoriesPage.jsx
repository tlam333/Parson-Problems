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
        description: "Restuarant Inventory Management",
        subtopic: "Personal Budget Tracking",
        imgSrc: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhjZWx8ZW58MHx8MHx8fDI%3D",
    },
    {
        title: "NMI",
        description: "Social Media Content Analysis",
        subtopic: "Customer Personal Preference",
        imgSrc: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXhjZWx8ZW58MHx8MHx8fDI%3D",
    },
    {
        title: "Sentence Splitting",
        description: "Customer Review",
        subtopic: "Legal Document Processing",
        imgSrc: "https://images.unsplash.com/photo-1610385983677-532611ff4ab2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3VtZW50fGVufDB8fDB8fHwy",
    },
    {
        title: "Correlation",
        description: "Marketing Campaign Effectiveness",
        subtopic: "Health and LifeStyle",
        imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvY3VtZW50fGVufDB8fDB8fHwy",
    },
    {
        title: "Linear Regression",
        description: "Employee Salary Prediction",
        subtopic: "Estate Pricing",
        imgSrc: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Decision Tree Classifier",
        description: "Customer Churn Prediction",
        subtopic: "Loan Approval Decision",
        imgSrc: "https://images.unsplash.com/photo-1675495667069-d18d7d78eeb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
        title: "CSV",
        description: "Student Grades Management",
        subtopic: "Employee Performance Records",
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

