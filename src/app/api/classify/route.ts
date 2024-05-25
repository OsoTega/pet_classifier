import { NextResponse } from "next/server";
import * as tf from '@tensorflow/tfjs-node';
import path from "path";
//import '@tensorflow/tfjs-node'

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const data = body?.data

        //console.log(data)

        const floatData = new Float32Array(Object.values(data));

        // Reshape the data into a tensor
        const imageTensor = tf.tensor4d(floatData, [1, 224, 224, 3]);

        const modelPath = path.resolve('./public/model_js/model.json')

        console.log(modelPath);

        const model = await tf.loadLayersModel(`file://${modelPath}`)

        return NextResponse.json({
            classify: 'User updated in database successfully'
        })
    } catch (error) {
        console.log(error);
        return new NextResponse('Error creating new user in database', {
            status: 500
        })
    }
}