'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const paymentSchema = z.object({
  firstname: z.string().min(1, "Le prénom est requis"),
  lastname: z.string().min(1, "Le nom est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().refine(val => /^22901\d{8}$/.test(val), {
    message: "Le numéro de téléphone doit commencer par 22901 et contenir 11 chiffres"
  }),
  amount: z.number().positive("Le montant doit être positif").min(1, "Le montant minimum est de 1"),
});

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange'
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("{baseUrl}/QosicBridge/user/requestpayment", {
        ...data,
        transref: new Date().getTime(),
        clientid: "*****",
      });
      
      setSubmitStatus('success');
      console.log(response.data);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur lors du traitement du paiement');
      console.error("Erreur lors du paiement", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Paiement Sécurisé</h2>
        
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center mb-4">
            <CheckCircle2 className="mr-3 text-green-500" />
            Paiement effectué avec succès !
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center mb-4">
            <AlertCircle className="mr-3 text-red-500" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input 
              {...register("firstname")} 
              placeholder="Prénom" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.firstname ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div>
            <input 
              {...register("lastname")} 
              placeholder="Nom" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.lastname ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
                {errors.lastname.message}
              </p>
            )}
          </div>

          <div>
            <input 
              {...register("address")} 
              placeholder="Adresse" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.address ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <input 
              {...register("email")} 
              placeholder="Email" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input 
              {...register("phone")} 
              placeholder="Numéro de téléphone (22901XXXXXXXX)" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <input 
              type="number" 
              {...register("amount", { valueAsNumber: true })} 
              placeholder="Montant" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.amount ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
                {errors.amount.message}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={!isValid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              isValid 
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Payer
          </button>
        </form>
      </div>
    </div>
  );
}
// import React, { useState } from 'react';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";
// import { AlertCircle, CheckCircle2 } from 'lucide-react';

// const paymentSchema = z.object({
//   firstname: z.string().min(4, "Le prénom est requis min 4 charactères"),
//   lastname: z.string().min(4, "Le nom est requis min 4 charactères"),
//   address: z.string().min(4, "L'adresse est requise min 4 charactères"),
//   email: z.string().email("Email invalide"),
//   amount: z.number().positive("Le montant doit être positif").min(1, "Le montant minimum est de 1"),
// });

// export default function PaymentForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm({
//     resolver: zodResolver(paymentSchema),
//     mode: 'onChange'
//   });

//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
//   const [errorMessage, setErrorMessage] = useState('');

//   const onSubmit = async (data: any) => {
//     try {
//       const response = await axios.post("{baseUrl}/QosicBridge/user/requestpayment", {
//         ...data,
//         transref: new Date().getTime(),
//         clientid: "*****",
//       });
      
//       setSubmitStatus('success');
//       console.log(response.data);
//     } catch (error) {
//       setSubmitStatus('error');
//       setErrorMessage('Erreur lors du traitement du paiement');
//       console.error("Erreur lors du paiement", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-black flex items-center justify-center p-6">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Paiement Sécurisé</h2>
        
//         {submitStatus === 'success' && (
//           <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center mb-4">
//             <CheckCircle2 className="mr-3 text-green-500" />
//             Paiement effectué avec succès !
//           </div>
//         )}

//         {submitStatus === 'error' && (
//           <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center mb-4">
//             <AlertCircle className="mr-3 text-red-500" />
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <input 
//               {...register("firstname")} 
//               placeholder="Prénom" 
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.firstname ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.firstname && (
//               <p className="text-red-500 text-sm mt-1 flex items-center">
//                 <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
//                 {errors.firstname.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <input 
//               {...register("lastname")} 
//               placeholder="Nom" 
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.lastname ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.lastname && (
//               <p className="text-red-500 text-sm mt-1 flex items-center">
//                 <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
//                 {errors.lastname.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <input 
//               {...register("address")} 
//               placeholder="Adresse" 
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.address ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm mt-1 flex items-center">
//                 <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
//                 {errors.address.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <input 
//               {...register("email")} 
//               placeholder="Email" 
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1 flex items-center">
//                 <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <input 
//               type="number" 
//               {...register("amount", { valueAsNumber: true })} 
//               placeholder="Montant" 
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.amount ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.amount && (
//               <p className="text-red-500 text-sm mt-1 flex items-center">
//                 <AlertCircle className="mr-2 text-red-500 h-4 w-4" />
//                 {errors.amount.message}
//               </p>
//             )}
//           </div>

//           <button 
//             type="submit" 
//             disabled={!isValid}
//             className={`w-full py-3 cursor-pointer rounded-lg text-white font-semibold transition-all duration-300 ${
//               isValid 
//                 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500' 
//                 : 'bg-gray-400 cursor-not-allowed'
//             }`}
//           >
//             Payer
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
