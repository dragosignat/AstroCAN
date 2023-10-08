function [sound_sin, duration] = calculate_sin(im, limits)

    n = size(im);
    norm = n(1) * n(2);

    % Define the original interval [0, 1000000]
    min_orig = 0;
    max_orig = 1000000;
    
    % Define the target interval [20, 20000]
    min_target = 20;
    max_target = 15000;
    
    % Define the value you want to rescale (e.g., 500000)
    
    % Calculate the rescaled value



    dim = (limits(1, 2) - limits(1, 1)) * (limits(2, 2) - limits(2, 1));

    amp = dim / norm * 4;
    if(amp < 0.5)
        amp = 0.5;
    end

    duration = 20 * (limits(1, 2) - limits(1, 1)) / n(1);
    t = 0 : 0.001 : duration *50;

    freq_dim = 500 / dim;
    dim_sin = sin(2 * pi * freq_dim * t);
    
    obj = im(limits(1, 1) : limits(1, 2), limits(2, 1) : limits(2, 2), :);
    size(obj)
    
    blue_freq = sum(sum(obj(:, :, 3))) / dim * 30 * freq_dim;
    blue_freq = ((blue_freq - min_orig) / (max_orig - min_orig)) * (max_target - min_target) + min_target
    blue_sin = sin(2 * pi * blue_freq * t);
    
    green_freq = sum(sum(obj(:, :, 2))) / dim * 10 * freq_dim;
    green_freq = ((green_freq - min_orig) / (max_orig - min_orig)) * (max_target - min_target) + min_target
    green_sin = sin(2 * pi * green_freq * t);

    red_freq = sum(sum(obj(:, :, 1))) / dim * 3 * freq_dim;
    red_freq = ((red_freq - min_orig) / (max_orig - min_orig)) * (max_target - min_target) + min_target
    red_sin = sin(2 * pi * red_freq * t);

    sound_sin = amp * (red_sin + green_sin + blue_sin);
  

end