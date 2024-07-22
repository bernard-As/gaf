import base64
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.files import File

def base64_to_file(base64_string, filename):
    # Split the base64 string into its header and data
    header, encoded = base64_string.split(',')
    
    # Decode the base64 data
    data = base64.b64decode(encoded)
    
    # Create a file-like object
    file = ContentFile(data, name=filename)
    
    return file