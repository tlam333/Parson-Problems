import React from 'react';
import {Link} from 'react-router-dom';

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
                        <Link to ="/WorkPage">
                        <p>{category.description}</p>
                        </Link>
                        <Link to ="/WorkPage">
                        <p>Subtopic</p>
                        </Link>
                        <div className="card-actions justify-end">
                        <Link to ="/WorkPage">
                                <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded">Learn now!</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;