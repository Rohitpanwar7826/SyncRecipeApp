import { toast } from 'react-toastify'

const infoMessageDark = (msg: string) => (
  toast.info(msg, {
    theme: "dark",
  })
)

const infoMessageLight = (msg: string) => (
  toast.info(msg)
)

const errorMessageDark = (msg: string) => (
  toast.error(msg, {
    theme: "dark",
  })
)

const errorMessageLight = (msg: string) => (
  toast.error(msg)
)

const updatedLoadingMessage = (msg: string) => {
  return toast.loading(msg)
}

const updatedLoadingMessageToSuccess = (id: any, msg: string) => {
  toast.update(id, { render: msg, type: "success", isLoading: false, autoClose: 3000 });
}

const updatedLoadingMessageToError = (id: any, msg: string) => {
  toast.update(id, { render: msg, type: "error", isLoading: false,  autoClose: 3000 });
}

export {
  infoMessageDark,
  infoMessageLight,
  errorMessageDark,
  errorMessageLight,
  updatedLoadingMessage,
  updatedLoadingMessageToSuccess,
  updatedLoadingMessageToError
}