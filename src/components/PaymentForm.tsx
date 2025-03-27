'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";

const paymentSchema = z.object({
  firstname: z.string().min(1, "Le prénom est requis"),
  lastname: z.string().min(1, "Le nom est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  email: z.string().email("Email invalide"),
  amount: z.number().positive("Le montant doit être positif"),
});

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(paymentSchema) });
  
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: any) => {
    setShowModal(true);
    try {
      const response = await axios.post("{baseUrl}/QosicBridge/user/requestpayment", {
        ...data,
        transref: new Date().getTime(),
        clientid: "*****",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors du paiement", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 text-gray-800  rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Formulaire de Paiement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("firstname")} placeholder="Prénom" className="w-full p-3 border rounded text-gray-800 " />
        <input {...register("lastname")} placeholder="Nom" className="w-full p-3 border rounded text-gray-800 " />
        <input {...register("address")} placeholder="Adresse" className="w-full p-3 border rounded text-gray-800 " />
        <input {...register("email")} placeholder="Email" className="w-full p-3 border rounded" />
        <input type="number" {...register("amount", { valueAsNumber: true })} placeholder="Montant" className="w-full p-3 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Payer</button>
      </form>
    </div>
  );
}


// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";

// const paymentSchema = z.object({
//   firstname: z.string().min(1, "Le prénom est requis"),
//   lastname: z.string().min(1, "Le nom est requis"),
//   address: z.string().min(1, "L'adresse est requise"),
//   email: z.string().email("Email invalide"),
//   amount: z.number().positive("Le montant doit être positif"),
// });

// export default function PaymentForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(paymentSchema) });

//   const onSubmit = async (data: any) => {
//     try {
//       const response = await axios.post("{baseUrl}/QosicBridge/user/requestpayment", {
//         ...data,
//         transref: new Date().getTime(),
//         clientid: "*****",
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Erreur lors du paiement", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstname")} placeholder="Prénom" />
//       {errors.firstname && <p>{errors.firstname.message}</p>}
//       <input {...register("lastname")} placeholder="Nom" />
//       {errors.lastname && <p>{errors.lastname.message}</p>}
//       <input {...register("address")} placeholder="Adresse" />
//       {errors.address && <p>{errors.address.message}</p>}
//       <input {...register("email")} placeholder="Email" />
//       {errors.email && <p>{errors.email.message}</p>}
//       <input type="number" {...register("amount", { valueAsNumber: true })} placeholder="Montant" />
//       {errors.amount && <p>{errors.amount.message}</p>}
//       <button type="submit">Payer</button>
//     </form>
//   );
// }