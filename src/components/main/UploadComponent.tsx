'use client'
import React, { useRef, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { createCanvas, loadImage } from 'canvas';

type Props = {}

const UploadComponent = (props: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState(false);
    const [category, setCategory] = useState({
        classification: '',
        probability: ''
    })

    const handleImageSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = async () => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            const width_ = 224
                            const height_ = 224
                            ctx.clearRect(0, 0, width_, height_);
                            canvas.width = width_;
                            canvas.height = height_;
                            ctx.drawImage(img, 0, 0, width_, height_);

                            const image = await loadImage(img.src);
                            const canvas_ = createCanvas(224, 224);
                            const ctx_ = canvas_.getContext('2d');

                            // Resize the image to 224x224
                            ctx_.drawImage(image, 0, 0, 224, 224);

                            // Get image data and create a tensor
                            const imageData = ctx_.getImageData(0, 0, 224, 224);
                            const { data } = imageData;

                            // Normalize and reshape the image data
                            const imgArray = [];
                            for (let i = 0; i < data.length; i += 4) {
                                imgArray.push(data[i] / 255);       // R
                                imgArray.push(data[i + 1] / 255); // G
                                imgArray.push(data[i + 2] / 255); // B
                                // Ignore the alpha channel (data[i + 3])
                            }
                            setCategory({
                                classification: "",
                                probability: ""
                            })
                            const imgArrayFloat32 = new Float32Array(imgArray);
                            setProcessing(true);
                            fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}`, {
                                body: JSON.stringify({ data: Array.from(imgArrayFloat32) }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                method: 'POST',
                                mode: 'cors'
                            }).then(async (response) => {
                                const data = await response.json()
                                setCategory({
                                    classification: data.classification,
                                    probability: data.probability.toFixed(8)
                                })
                                setProcessing(false);
                            })
                        }
                    }
                };
                if (e.target?.result) {
                    img.src = e.target.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Card className="w-[350px] mt-8">
                <CardHeader>
                    <CardTitle>Classify Pet</CardTitle>
                    <CardDescription>Pet classification system</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <canvas ref={canvasRef}></canvas>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button disabled={processing} onClick={handleImageSelect}>{
                        processing === false ? "Select Image" : "Processing"
                    }</Button>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </CardFooter>
            </Card>
            <h2 className="mb-8 mt-8 text-2xl text-center font-semibold">
                {category.classification + " "}
                {category.classification && (
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                    </span>
                )}
                {" " + category.probability}%
            </h2>
        </div>
    );
};

export default UploadComponent;
