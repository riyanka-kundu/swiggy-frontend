// "use client";

// import { useRouter } from "next/navigation";
// import { useMyRestaurant } from "@/hooks/restaurant-owner";
// import ContractForm from "@/components/onboarding/step4/contract/contract-form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2 } from "lucide-react";

// export default function ContractPage() {
//   const router = useRouter();
//   const { data: restaurant, isLoading } = useMyRestaurant();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//       </div>
//     );
//   }

//   // Contract already accepted — show completed state
//   if (restaurant?.contract?.accepted) {
//     const signatory = restaurant.contract.signatory;
//     const acceptedAt = restaurant.contract.acceptedAt
//       ? new Date(restaurant.contract.acceptedAt).toLocaleDateString("en-IN", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })
//       : null;

//     return (
//       <Card className="border-green-200 bg-green-50/50">
//         <CardHeader className="text-center">
//           <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//             <CheckCircle2 className="h-8 w-8 text-green-600" />
//           </div>
//           <CardTitle className="text-xl text-green-800">
//             Partner Agreement Accepted
//           </CardTitle>
//           <CardDescription className="text-green-700">
//             Your partner contract has been signed and submitted successfully.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="mx-auto max-w-sm space-y-2 rounded-lg border border-green-200 bg-white p-4 text-sm">
//             {signatory?.fullName && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Signatory</span>
//                 <span className="font-medium">{signatory.fullName}</span>
//               </div>
//             )}
//             {signatory?.designation && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Designation</span>
//                 <span className="font-medium">{signatory.designation}</span>
//               </div>
//             )}
//             {signatory?.place && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Place</span>
//                 <span className="font-medium">{signatory.place}</span>
//               </div>
//             )}
//             {acceptedAt && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Accepted on</span>
//                 <span className="font-medium">{acceptedAt}</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Contract Version</span>
//               <span className="font-medium">
//                 {restaurant.contract.contractVersion || "v1.0"}
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-center pt-2">
//             <Button onClick={() => router.push("/partner/dashboard")}>
//               Go to Dashboard
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <ContractForm
//       onNext={() => {
//         router.push("/partner/onboarding/success");
//       }}
//     />
//   );
// }

"use client";

import { useRouter } from "next/navigation";

import ContractForm from "@/components/onboarding/step3/contract/contract-form";

export default function ContractPage() {
  const router = useRouter();

  return (
    <ContractForm
      onNext={() => {
        router.push("/partner/dashboard");
      }}
    />
  );
}
