import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    const [videoUrl, setVideoUrl] = useState('');

    const handleImageUpload = async (e) => {
        setVideoUrl('');
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onload = async () => {
            const imageData = reader.result.split(',')[1];

            try {
                const response = await axios.post('http://192.168.1.122:8000/image', {
                    "base64_image": imageData
                });

                const videoUrl = response.data.video_url;
                setVideoUrl(videoUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };

        reader.readAsDataURL(file);
    };

    useEffect((e) => {
       window.scrollTo(0, 0);
    }, []);

  return (
    <div>
    <html data-bs-theme="light" lang="en"></html>
    <head>
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"></meta>
    <title>AstroCAN</title>
    <link rel="icon" href="favicon.ico" />
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css"></link>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic&amp;display=swap"></link>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin:700&amp;display=swap"></link>
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css"></link>
    <link rel="stylesheet" href="assets/css/Pricing-Free-Paid-badges.css"></link>
    <link rel="stylesheet" href="assets/css/Pricing-Free-Paid-icons.css"></link>
</head>

<body id="page-top" data-bs-spy="scroll" data-bs-target="#mainNav" data-bs-offset="77">
    <div>
    <nav class="navbar navbar-expand-md fixed-top navbar-light" id="mainNav">
        <div class="container"><a class="navbar-brand" href="#"></a><button data-bs-toggle="collapse" class="navbar-toggler navbar-toggler-right" data-bs-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" value="Menu"><i class="fa fa-bars"></i></button><img src="assets/img/rsz_astrocan_logo.png" width="175" height="81"></img>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item nav-link"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item nav-link"><a class="nav-link" href="#listen">Listen</a></li>
                    <li class="nav-item nav-link"><a class="nav-link" href="#learning">Learn</a></li>
                    <li class="nav-item nav-link"><a class="nav-link" href="#pricing">Pricing</a></li>
                    <li class="nav-item nav-link"><a class="nav-link" href="#team">Our team</a></li>
                    <li class="nav-item nav-link"><a class="nav-link" href="#contact">Contact us</a></li>
                </ul>
            </div>
        </div>
    </nav>
    
    <header class="masthead" style={{ backgroundImage: 'url("assets/img/background.jpg")'}}>
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <h1 class="brand-heading">AstroCAN</h1>
                        <p class="intro-text"><strong>Discover the sounds of your favorite images.</strong></p><a class="btn btn-link btn-circle" role="button" href="#about"><i class="fa fa-angle-double-down animated"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section class="text-center content-section" id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <h2>About Astrocan</h2>
                    <p>AstroCAN is an app where you can listen to and enjoy the sonified version (transformed into sound!) of any image you would like to. This is our solution to NASA Space Apps challenge 2023.</p>
                    <p>Our mission is helping people enjoy the little things (or bigger ones, literally) in life, such as the sounds that our universe can create, in order to help people relax and enjoy themselves in their free time and educate them on their surroundings.</p>
                    <p>We wish to bring sparkle in front of your eyes and melody to your ears.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="text-center content-section id" id="listen">
  <div className="container">
    <h2>Listen</h2>

    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: 'none' }}
      id="fileInput"
    />

    <label
      htmlFor="fileInput"
      className="custom-file-upload-button2"
    >
    <span>Upload</span>
    </label>

    {videoUrl && (
      <div style={{ marginTop: '30px' }}>
      <audio controls>
        <source src={videoUrl} type="audio/wav" />
      </audio>
      </div>
    )}
  </div>
</section>


    <section class="text-center content-section" id="learning">
  <div class="container py-4 py-xl-5">
    <div class="row mb-5">
      <div class="col-md-8 col-xl-6 text-center mx-auto">
        <h2>Learn</h2>
        <p class="w-lg-50">Learn more about our environment.</p>
      </div>
    </div>

    <div class="row gy-4 row-cols-1 row-cols-md-2">
      <div class="col">
        <div class="d-flex flex-column align-items-center">
          <video width="600" height="400" controls>
            <source src="./assets/videos/video1.mp4" type="video/mp4" />
          </video>
          <h4 style={{ marginTop: '15px' }}>How Light Pollution Affects Night Skies</h4>
        </div>
      </div>

      <div class="col">
        <div class="d-flex flex-column align-items-center">
          <video width="600" height="400" controls>
            <source src="./assets/videos/video2.mp4" type="video/mp4" />
          </video>
          <h4 style={{ marginTop: '15px' }}>What is Light Pollution</h4>
        </div>
      </div>
    </div>
  </div>
</section>


    <section class="text-center content-section" id="pricing">
      <div class="container py-4 py-xl-5">
          <div class="row mb-5">
              <div class="col-md-8 col-xl-6 text-center mx-auto">
                  <h2>Pricing</h2>
                  <p class="w-lg-50">Discover our pricing plans and choose the best solution for your interests.</p>
              </div>
          </div>
          <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3 d-xl-flex">
              <div class="col">
                  <div class="card mb-4">
                      <div class="card-body text-center p-4">
                          <h4 class="fw-bold card-subtitle">Free</h4>
                          <h4 class="display-5 fw-bold card-title">$0</h4>
                          <p></p>
                      </div>
                  </div>
                  <div class="bg-body-tertiary border rounded border-0 p-4">
                      <ul class="list-unstyled">
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)'}}>Generate sounds using our app</span></span></li>
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)'}}>Educate yourself about the environment</span></span></li>
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)'}}>Explore a new meditation playground</span></span></li>
                      </ul>
                  </div>
              </div>
              <div class="col">
                  <div class="card border-primary border-2 mb-4">
                      <div class="card-body text-center p-4"><span class="badge rounded-pill bg-primary position-absolute top-0 start-50 translate-middle text-uppercase">Most Popular</span>
                          <h4 class="fw-bold card-subtitle">Pro</h4>
                          <h4 class="display-5 fw-bold card-title">$5<span class="fs-4 fw-normal text-muted">/mo</span></h4><a class="btn btn-primary d-block w-100" role="button" href="#">register</a>
                      </div>
                  </div>
                  <div class="bg-body-tertiary border rounded border-0 p-4">
                      <ul class="list-unstyled" style={{textAlign: 'left'}}>
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)'}}>Generate sounds using our app</span></span></li>
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)'}}>Educate yourself about the environment</span></span></li>
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)'}}>Explore a new meditation playground</span></span></li>
                          <li class="d-flex mb-2"><span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span><span><span style={{color: 'rgb(0, 0, 0)', textAlign: 'left'}}>Download any generated sound content and access it offline</span></span></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    </section>

    <section class="text-center content-section" id="team">
    <div class="container py-4 py-xl-5">
            <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2>Our Team</h2>
                    <p class="w-lg-50">Meet the members of our team and discover our projects.</p>
                </div>
            </div>
            <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div class="col">
                    <div class="card border-0 shadow-none">
                            <div style={{height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h5 class="fw-bold text-primary mb-0">Honceriu Emilian</h5>
                            </div>
                    </div>
                </div>

                <div class="col">
                <div class="card border-0 shadow-none">
                            <div style={{height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h5 class="fw-bold text-primary mb-0">Ignat Dragos</h5>
                            </div>
                    </div>
                </div>

                <div class="col">
                <div class="card border-0 shadow-none">
                            <div style={{height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h5 class="fw-bold text-primary mb-0">Morosanu Tudor</h5>
                            </div>
                    </div>
                </div>
            </div>

            <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div class="col">
                <div class="card border-0 shadow-none">
                            <div style={{height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h5 class="fw-bold text-primary mb-0">Plesca Evelyn</h5>
                            </div>
                    </div>
                </div>

                <div class="col">
                <div class="card border-0 shadow-none">
                            <div style={{height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h5 class="fw-bold text-primary mb-0">Rizoiu Tudor</h5>
                            </div>
                    </div>
                </div>

                <div class="col">
                <div class="card border-0 shadow-none">
                            <div style={{height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h5 class="fw-bold text-primary mb-0">Simu Radu</h5>
                            </div>
                    </div>
                </div>
            </div>
    </div>
    </section>

    <section class="text-center content-section" id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <h2>Contact us</h2>
                    <p>Feel free to contact us regarding any future improvements you would love seeing.</p>
                    <ul class="list-inline banner-social-buttons">
                        <li class="list-inline-item">&nbsp;</li>
                        <li class="list-inline-item">
                            <a href="https://github.com/dragosignat/AstroCAN" target="_blank" class="btn btn-primary btn-lg btn-default">
                              <i class="fa fa-github fa-fw"></i><span class="network-name">&nbsp;github</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <div class="map-clean"></div>

    <footer>
        <div class="container text-center">
            <p>Copyright ©&nbsp;AstroCAN 2023</p>
        </div>
    </footer>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/grayscale.js"></script>
    </div>
    </body>
    </div>
  )
}