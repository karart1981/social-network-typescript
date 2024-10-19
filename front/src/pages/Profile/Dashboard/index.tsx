import { useOutletContext } from "react-router-dom"
import { IContextType } from "../../../lib/types"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { BASE_URL, COVER, DEFAULT_PIC } from "../../../lib/constant";
import { useRef } from "react";
import { handleCoverUpload, handlePictureUpload } from "../../../lib/api";


export const Dashboard = () => {

    const {account, setAccount} = useOutletContext<IContextType>()

    const photo = useRef<HTMLInputElement | null>(null)

    const cover = useRef<HTMLInputElement | null>(null)

    const handlePictrue = () => {
      if(photo.current) {
         const file = photo.current.files?.[0]
         if(file) {
            const form = new FormData()

            form.append('picture', file)

            handlePictureUpload(form)
            .then(response => {
              if(response.payload) {
                setAccount({...account, picture: response.payload as string})
              }
            })
         }
      }
    }

    const handleCover = () => {
      if(cover.current) {
        const file = cover.current.files?.[0]
        if(file) {
          const form = new FormData()

          form.append('cover', file)

          handleCoverUpload(form)
          .then(response => {
            if(response.payload) {
               setAccount({...account, cover: response.payload as string})
            }
          })
        }
      }
    }


  return (
    <div className="gradient-custom-2 dashboard" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ 
                      backgroundColor: '#000', 
                      height: '200px', 
                      backgroundImage: `${account.cover ? `url(${BASE_URL + account.cover}` : ''}`,
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'relative'   
                      }}>

                      <img 
                          src={COVER}
                          style={{
                            width: 40, 
                            height: 40, 
                            cursor: 'pointer', 
                            position: 'absolute', 
                            right: 10, 
                            bottom: 5
                          }}
                          onClick={() => cover.current?.click()}
                       />
                      
                <input 
                    type="file"
                    ref={cover}
                    onChange={handleCover}
                    style={{display: 'none'}}
                    />

                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                
                <input 
                    type="file" 
                    ref={photo}
                    onChange={handlePictrue}
                    style={{display: 'none'}}
                />
                  <MDBCardImage 
                      src={!account.picture ? DEFAULT_PIC : BASE_URL + account.picture}
                      alt="Generic placeholder image" 
                      className="mt-4 mb-2 img-thumbnail" 
                      fluid 
                      style={{ width: '150px', zIndex: '1', cursor: 'pointer' }}
                      onClick={() => photo.current?.click()}
                      />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{account.name} {account.surname}</MDBTypography>
                  <MDBCardText>Erevan</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account.followers.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account.following.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}