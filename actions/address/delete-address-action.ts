"use server";
import { deleteAddressService } from "@/services/address/delete-address-service";

export async function deleteAddressAction(id: string) {
  if (!id)
    return {
      message: "Não foi possível excluir o endereço",
      success: false,
    };

  try {
    const deleteAddress = await deleteAddressService(id);

    return deleteAddress;
  } catch (e) {
    console.error(e);
    return {
      message: "Não foi possível excluir o endereço",
      success: false,
    };
  }
}
