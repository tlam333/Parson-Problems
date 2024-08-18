import React from 'react';
import NavMenu from '../components/NavMenu.jsx';
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
        title: "Dataframe",
        description: "Learn More",
        imgSrc: "https://files.realpython.com/media/A-Guide-to-Pandas-Dataframes_Watermarked.7330c8fd51bb.jpg",
    },
    {
        title: "Normalised Mutual Information",
        description: "Learn More",
        imgSrc: "https://miro.medium.com/v2/resize:fit:1400/1*TWTgh2FDrC8yO8p3GhV8gA.png",
    },
    {
        title: "Sentence Splitting",
        description: "Learn More",
        imgSrc: "https://ulifeai.cameroongcerevision.com/wp-content/uploads/2023/02/Copy-of-5G-Technology-Presentation-in-Green-Orange-Modular-Abstract-Style.png",
    },
    {
        title: "Correlation",
        description: "Learn More",
        imgSrc: "https://www.osmosis.org/_next/image?url=https%3A%2F%2Fosmose-it.s3.amazonaws.com%2FwWfoaGhsQEyLamWVTaw4nUfuRU_9nuL1%2F_.jpg&w=3840&q=75",
    },
    {
        title: "Linear Regression",
        description: "Learn More",
        imgSrc: "https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_11_MicrosoftTeams-image-86-2.jpg",
    },
    {
        title: "Decision Tree Classifier",
        description: "Learn More",
        imgSrc: "https://i.ytimg.com/vi/ZVR2Way4nwQ/maxresdefault.jpg",
    },
    {
        title: "Reading/Writing CSV files",
        description: "Learn More",
        imgSrc: "https://files.realpython.com/media/Python-Text-Parsing_Watermarked.5ac48b25acf2.jpg",
    },
];


const CategoriesPage = () => {
    return (
        <>
        <NavMenu/>
        <CategoriesBody/>
        <Categories categories={categoriesData}/>
        </>
    );
};

export default CategoriesPage;

