import React from 'react';

const Categories = ({ categories }) => {
    return (
        <div className="bg-black flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
                <div key={index} className="card glass w-96">
                    <figure>
                        <img src={category.imgSrc} alt={category.title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.title}</h2>
                        <p>{category.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;