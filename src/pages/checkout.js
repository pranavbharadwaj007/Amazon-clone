import Image from "next/image";
import { useSelector } from "react-redux";
import CheckOutProduct from "../components/CheckOutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import {useSession} from 'next-auth/client'
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise=loadStripe(process.env.stripe_public_key);
function Checkout() {
    const items=useSelector(selectItems);
    const total=useSelector(selectTotal);
    const [session]=useSession();
    const createCheckOutSession=async()=>{
        const stripe=await stripePromise;
        const checkoutSession= await axios.post(`/api/create-checkout-session`,
        {
            items:items,
            email:session.user.email
        }
        );
        const result=await stripe.redirectToCheckout({
                    sessionId:checkoutSession.data.id,
        });
        if(result.error){
            console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror")
            alert(result.error.message);
        }
    }
    return (
        <div className="bg-gray-100">
            <Header/>
            <main className="lg:flex max-w-screen-2xl lg:pl-6 mx-auto">
               <div className="flex-grow m-5 shadow-sm">
                    <Image src="https://links.papareact.com/ikj"
                    width={1020}
                    height={250}
                    objectFit="contain"

                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-2xl border-b pb-4">{items.length ===0 ? 'Your Amazon Basket is Empty.': "Your Shopping Basket"}</h1>
                        {items.map((item,i)=>(
                            <CheckOutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
               </div>

               <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length>0 && (
                    <>
                    <h2 className="whitespace-nowrap">Subtotal ({items.length} items):
                    <span className="font-bold">
                        <Currency quantity={total} />
                    </span>
                     </h2>
                     <button
                     role="link"
                     onClick={createCheckOutSession}
                      disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                         {!session ? 'Sign in to checkout':'Proceed to Checkout'}
                     </button>
                    </>
                )}
               </div>
            </main>
        </div>
    )
}

export default Checkout
