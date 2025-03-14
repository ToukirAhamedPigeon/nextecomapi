/** @type {import('next').NextConfig} */
const nextConfig = {
    //protect api with origin cors
    async headers(){
        return [
            {
                source:"/api/:path*",
                headers:[
                    { 
                        key:"Access-Control-Allow-Origin",
                        value:"*"
                        // value:"http://localhost:3000"
                    },
                    {
                        key:"Access-Control-Allow-Methods",
                        value:"GET, POST, PUT, DELETE, OPTIONS"
                    },
                    {
                        key:"Access-Control-Allow-Headers",
                        value:"Content-Type, Authorization"
                    }
                ]
            }
        ]
    }
}

export default nextConfig;
