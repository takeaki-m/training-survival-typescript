import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";

interface CatCategory {
    id: number;
    name: string;
}

interface SearchCatImage {
    breeds: string[];
    categories: CatCategory[];
    id: string;
    url: string;
    width: number;
    height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async (): Promise<SearchCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = ( await res.json()) as SearchCatImageResponse ;
    return result[0];
};

interface IndexPageProps {
    initialCatImageUrl: string;
}

const IndexPages: NextPage<IndexPageProps> = ({ initialCatImageUrl}) => { 
    const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
   
    const handleClick = async () => {
        const image = await fetchCatImage();
        setCatImageUrl(image.url);
    };

    return (
        <div>
            <button onClick={handleClick}>きょうのにゃんこ🐱</button>
            <div style={{ marginTop: 8}}>
                <img src= {catImageUrl} width={500} height="auto" />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps>  = async () => {
    const catImage = await fetchCatImage();
    return {
        props: {
            initialCatImageurl: catImage.url,
        },
    };
};

export default IndexPages;