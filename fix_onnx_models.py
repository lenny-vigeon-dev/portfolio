import onnx
import os

def convert_to_self_contained(model_path):
    print(f"Processing {model_path}...")
    try:
        # Load the model. This will automatically load the external data if present in the same dir.
        model = onnx.load(model_path)

        # Save the model. By default, onnx.save will inline the data if it's small enough.
        # We explicitly set save_as_external_data=False to be sure.
        onnx.save(model, model_path, save_as_external_data=False)
        print(f"Successfully converted {model_path} to self-contained format.")

        # Optional: Remove the .data file if it exists
        data_file = model_path + ".data"
        if os.path.exists(data_file):
            os.remove(data_file)
            print(f"Removed external data file: {data_file}")

    except Exception as e:
        print(f"Error processing {model_path}: {e}")

base_dir = "static"
models = [
    "alphabet_30/alphabet_30.onnx",
    "alphabet_detect_30/alphabet_detect_30.onnx",
    "alphabet_no_null/alphabet_no_null.onnx",
    "alphabet_detect/alphabet_detect.onnx"
]

for m in models:
    path = os.path.join(base_dir, m)
    if os.path.exists(path):
        convert_to_self_contained(path)
    else:
        print(f"File not found: {path}")
