import axios from 'axios'
// here we use the Cohere API
export default function SummarizePage(props) {
    return (
        <div>
            <h1>
                Summary Page
            </h1>
            <p>
                {props.summary != undefined ? props.summary : null}
            </p>
        </div>
    )
}

export async function getServerSideProps(context) {
    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/v1/summarize',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer 6skmlXFQcQVBf0zjsBojiAJAwgJ7Gt3MKm8ke5sc'
        },
        data: {
          length: 'medium',
          format: 'paragraph',
          model: 'summarize-xlarge',
          num_generations: 2,
          extractiveness: 'low',
          temperature: 0.3,
          text: context.query.text.toString() + context.query.text.toString(),
        }
      };
      let summary;
      axios
        .request(options)
        .then(function (response) {
            summary = response.data.summary;
            console.log(response.data.summary);
        })
        .catch(function (error) {
          console.error(error);
        });
    
    return {
        props: {
            summary: summary != undefined ? summary : null,
        }
    }
}