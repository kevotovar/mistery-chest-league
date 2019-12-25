import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

export default ReactSwal.mixin({
  toast: true,
  timer: 5000,
  timerProgressBar: true,
  position: 'top-right',
  showConfirmButton: false,
})
