### Setup and Local Development

A sophisticated application for summoning random animated images from the internet. To witness this marvel on your own machine, follow these steps.

#### Prerequisites

- **Git**: For cloning the repository.
- **Python 3**: For running a simple local web server.

#### Steps

1.  **Clone the Repository**

    First, you must acquire the source code. Open your terminal to you desired install location and download the project with this command:

    ```bash
    git clone https://github.com/perkolatte/AJAX-Giphy-Party.git
    ```

2.  **Navigate to the Project Directory**

    Change directory into the newly created project folder:

    ```bash
    cd AJAX-Giphy-Party
    ```

3.  **Start a Local Server**

    Because modern browsers have trust issues (see: CORS policy) and won't let `file://` URLs talk to APIs, we need to humor them with a real server. This command uses Python's built-in module to do just that.

    ```bash
    python3 -m http.server
    ```

4.  **Open in Browser**

    Your terminal will dutifully report that it is now `Serving HTTP on 0.0.0.0 port 8000`. Point your browser to the following address and prepare for the party. Or, you know, a webpage with some GIFs on it.

    `http://localhost:8000`
