## Ce trebuie sa faceti si cum:
 - Partea de generare de video inca nu avem, aveti functiile definite in `image_processing.py`, modifica acolo
 - Partea de generare de sunet, trebuie sa fie putin mai rafinata, tot in `image_processing.py` se gaseste functia ce genereaza
 - Puteti folosi doar `image_processing.py` pentru a face task-urile de mai sus, daca vreti sa va jucati si cu endpoint-ul de API
 puteti prin a folosi comanda `uvicorn main:app --reload`, dar aveti nevoie sa va instalati ceva pachete (nu aveti nevoie, acolo merge tot,
 am dat hard code la ceva daca vreti sa incercati, ca numa de la mine e setat sa pot da upload pe AWS S3 (locul unde tinem video-urile)
 - Pt front end: `https://nasa-hackathon-cluj.s3.eu-north-1.amazonaws.com/2a429303-cbd7-424e-bf9e-01e3843dcc66_video.mp4` o sa primiti link-uri ca asta, implementati un video player care sa ruleze de la link-uri din astea
 - Also front end: trebuie sa dati push la imagine pe `/image` la api, el asteapta un request cu body JSON in care sa fie de forma:
    ```
        {"base64_image":"BASE64 ENCODED IMAGE"}
    ```
    (asta inseamna ca luati poza de la user cand da upload, ii dati encode si acel string encoded se trimite la api in body)
 - Again API-ul merge, doar partea de generare video inca nu e gata si suna cam weird in piton tot.
