import React from 'react'
import { useState } from 'react';
const Meme = ({ meme, setMeme }) => {
    // console.log(meme);
    const [form, setForm] = useState({
        template_id: meme.id,
        username: "vaibhav456t",
        password: "8687323596",
        boxes: [],
    });
    const generateMeme = () => {
        let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
        form.boxes.map((box, index) => {
            url += `&boxes[${index}][text]=${box.text}`;
        })
        fetch(url).then(res => res.json()).then(data => {
            setMeme({...meme, url: data.data.url})
        })
    };
  return (
    <div className="meme">
        <img src={meme.url} alt="" />
        <div>
          {[...Array(meme.box_count)].map((_, index) =>(
              <input key={index} type="text" placeholder={`Meme Captions ${index + 1}`} onChange={(e) => {
                  const newBoxes = form.boxes;
                  newBoxes[index] = { text: e.target.value };
                  setForm({...form, boxes: newBoxes});
              }}/>
          ))}
        </div>
        <div>
            <button onClick={generateMeme}>Generate Memes</button>
            <button onClick={() => {
                setMeme(null)
            }}>Choose Templates</button>
        </div>
    </div>
  )
}

export default Meme;