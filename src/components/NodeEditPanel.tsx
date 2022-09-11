import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
    onClick: (url: string) => void
}

const NodeEditPanel: React.FC<Props> = (props) => {
    const [ogp, setOgp] = useState({ title: "", image: "" });
    const [url, setUrl] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios('http://localhost:3000/ogp', { params: { url: url } });
            console.log(res.data)
            setOgp(res.data);
        };
        fetchData();
    }, [url])
    return (
        <div className='w-[200px]'>
            <form>
                <label>
                    URL:
                    <input type="text" className="border" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <button type="button" onClick={() => props.onClick(url)}>Fetch</button>
                </label>
            </form>

            <div>Title: {ogp.title}</div>
            <div>Image: <img src={ogp.image} /></div>

        </div>
    )
};

export default NodeEditPanel;