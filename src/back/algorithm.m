im = imread('D:\tudoralea\spaceapp\imagini\planete.JPG');
im = imgaussfilt(im,3);
imshow(im);


if(~islogical(im))
    if(ndims(im)>2), img = rgb2gray(im); end
    level =  graythresh(img); BW = im2bw(img, level);
else
    BW = img;
end

combined_sound = [];

%BW= ~BW;

[B,L,N] = bwboundaries(BW,'noholes');
% n nr of objects in the image 

%figure, imshow(BW);
%%
fs = 44100;
%imshow(im);

for k=1:N 
   X = B{k}(:,2);
   Y = B{k}(:,1);

   max_y = max(X);
   min_y = min(X);

   max_x = max(Y);
   min_x = min(Y);

   contur = [X'; Y'];

%     duration = (max_x - min_x)/25;
%     frequency = 2000 / (max_y - min_y);

    t = linspace(0, duration, fs * duration);
    [sin_sound, sin_time] = calculate_sin(im, [min_x max_x; min_y max_y]);
    sound(sin_sound, 44100);
    combined_sound = [combined_sound sin_sound];
    pause(0.2);

   % figure, plot(X,Y);
end

% filename = 'planete_sounds.wav';
% audiowrite(filename, combined_sound, fs);