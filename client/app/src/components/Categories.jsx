import React from 'react';
import {Link} from 'react-router-dom';


const Categories = ({ categories }) => {


    return (
        <div className="bg-black flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
                <div key={index} className="card glass w-96 text-white font-bold">
                    <figure>
                        <img src={category.imgSrc} alt={category.title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.title}</h2>
                        <ul className="menu bg-orange-500 text-black font-bold py-2 px-4 rounded">
                        <Link to = "/WorkPage"
                            state = {{topic : category.title, theme : category.subtopic1}}><li><a className="hover:bg-orange-600">{category.subtopic1}</a></li></Link>
                        <Link to = "/WorkPage"
                            state = {{topic : category.title, theme : category.subtopic2}}><li><a className="hover:bg-orange-600">{category.subtopic2}</a></li></Link>
                        <Link to = "/WorkPage"
                            state = {{topic : category.title, theme : category.subtopic3}}><li><a className="hover:bg-orange-600">{category.subtopic3}</a></li></Link>
                        </ul>
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default Categories;