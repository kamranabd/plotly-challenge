function init() {
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
      console.log(data);
      const names = data.names;
      names.forEach((item) => {
          selector
              .append("option")
              .text(item);
      });
      
      const sampleName = names[0];
      buildMetadata(sampleName);
      buildBarChart(sampleName);
      buildBubbleChart(sampleName);
  });
};

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
      const panel = d3.select("#sample-metadata");
      const metadata = data.metadata;
      let sampleData = metadata.filter(item => item.id == sample);
      const resultData = sampleData[0];
      panel.html("");
      Object.entries(resultData).forEach(([key, value]) => {
          panel.append("p")
               .text(`${key}: ${value}`);
      })
  });
}

function buildBarChart(sample) {
  d3.json("samples.json").then(data => {
    const samples = data.samples;
    const sampleData = samples.filter(item => item.id == sample);
    
    const sampleID = sampleData[0].id;
    const sampleValues = sampleData[0].sample_values;
    const sampleOtuIds = sampleData[0].otu_ids;
    const sampleOtuLabels = sampleData[0].otu_labels;

    var otuIds = sampleOtuIds.slice(0,10).map(ids => {
      return `OTU ${ids}`;
    }).reverse();

    var bacteriaValues = sampleValues.slice(0,10).reverse;
    var bacteriaLabels = sampleOtuLabels.slice(0,10).reverse;

    const trace = {
      x: bacteriaValues,
      y: otuIds,
      text: bacteriaLabels,
      type: 'bar',
      orientation: 'h',
    };
    var data = [trace];
    var layout = {
      title: `Sample ID: ${sampleID}`
    };
    Plotly.newPlot("plot1", data, layout);
  })
};

function buildBubbleChart(sample) {
  d3.json("samples.json").then((data) => {
      const samples = data.samples;
      const sampleData = samples.filter(item => item.id == sample);

      const sampleID = sampleData[0].id;
      const sampleValues = sampleData[0].sample_values;
      const sampleOtuIds = sampleData[0].otu_ids;
      const sampleOtuLabels = sampleData[0].otu_labels;

      var otuIds = sampleOtuIds.map(ids => {
        return ids;
      }).reverse();

      var BacterialSpecies = sampleValues.reverse();
      var BacterialSpeciesLabels = sampleOtuLabels.reverse();

      var trace = {
          x: otuIds,
          y: BacterialSpecies,
          text: BacterialSpeciesLabels,
          mode: 'markers',
          marker: {
              color: otuIds,
              size: BacterialSpecies
          }
      };
      var data = [trace];
      var layout = {
          title: `Sample ID ${sampleID}`,
          showlegend: false,
          height: 600,
      };
      Plotly.newPlot("bubble", data, layout)
  })
}

init();

