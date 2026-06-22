# 1 WHAT THEY TARGET
The vaccine they developed is targeting the Corona Virus delivery mechanism, Especially the "N501Y (asparagine to tyrosine) substitution in the receptor binding domain (RBD)". To explain that: You probably heard at some point that Sars-CoV2 is a Spike protein. The spikes are basically the part that allows the virus to connect to human cells. See the image below they show it as a connection of the spike protein to the ACE2 (ACE2 being a protein on the surface of many cell types in the human body. It acts as an important biochemical regulator of blood pressure, wound healing, and inflammation).
 
 
# 2 WHAT THEY DEVELOPED
Because the RBD is what docks onto ACE-2, antibodies that basically coat the RBD can physically block receptor engagement and stop infection outright. all current vaccines use the full-length spike as target, but only 16% of the antibodies generated against the spike are RBD-directed. So what they aim for is a much more focussed approach. Normally this region (epitope) is subdominant, which means the immune system prefers to attack the variable, strain-specific surface (which is exactly why we get the endless "variant chase"
 
 
# 3 HOW THEY DEVELOP THAT
To insilico design the drug they worked from two angles: 
 
I.) Angle One
what they started with is, they analysed Amino Acid Sequences of the Spike Proteins of several Variants of Covid and other Viruses of the same "Family"  (examples you can see in Fig.1. b). To do so, they applied an homology based approach "IQ-TREE" to infer phylogenetic trees based on maximum likelihood. The process relies on the core assumption that your input sequences are homologous (meaning they share a common evolutionary ancestor and can be aligned properly), thereby finding overlapping subsequence's (See Fig. 2. a).
 
They fed the tree into HyPhy to compute an optimized core sequence they called T2_13 a sequence engineered to be phylogenetically the closest single sequence to every sarbecovirus in the tree. 
 
II.) Angle two
In parallel, they pulled 3D structures of spike-plus-antibody pairs from the PDB (a public database of solved molecular structures, e.g. RCSB PDB - 7YAD: Cryo-EM structure of S309-RBD-RBD-S309 in the S309-bound Omicron spike protein (lo…) and zoomed in on the exact patch each antibody binds — the epitope. Checking these against the family, they found some patches barely change between viruses (S309, CR3022) while one varies a lot (B38). The conserved patches are the ones worth targeting, since antibodies against them work across many viruses at once.
 
III.) Engineering the antigen
Now they combined both angles. Starting from the T2_13 core sequence. on the variable, "distracting" patch (the B38 site), they added a glycan = a sugar group that acts like a shield, hiding that patch from the immune system. Normally the immune system is drawn to that variable region and makes antibodies against it; but those antibodies don't work well across different variants. By masking it, they redirect the response toward the conserved patches instead, producing antibodies that protect broadly. To place the sugar without distorting the protein's shape, they computationally tested candidate positions and kept the one that was most structurally stable using FoldX. Then they Used SCWRL to refine/check side chains and GROMACS for energy minimization. This produced a small panel of candidate antigens (T2_13 through T2_18 the six structures lower right in Fig.2) that aligend with all goals of antibody design. Finally they made these candidates for real and tested them in animals (mice, then guinea pigs and rabbits), measuring how broadly the resulting antibodies recognised different viruses
 
In Summary: Instead of picking any one real virus's RBD as the target, they built a synthetic "centre-point" RBD sitting at the evolutionary middle of the whole family, then masked its distracting variable region so the immune system focuses on the parts shared across all of them. Because the design is built from the family tree's evolutionary model, it captures both the features common to the whole group and the meaningful differences between its members — which is what gives it a shot at protecting against viruses that haven't even emerged yet.
 
# 4 VERDIC OF AI USE
If I have not missed anything here! this pipeline is essentially not AI. Here's what the tools they actually used are:
IQ-TREE — maximum-likelihood phylogenetics. A statistical/heuristic search over tree topologies. No learned model.
HyPhy — statistical analysis of evolution across a phylogeny; used to compute the consensus sequence. Evolutionary modeling, not ML.
MUSCLE — progressive sequence alignment. A classic deterministic bioinformatics algorithm.
FoldX — an empirical force field: a physics-and-statistics-based energy function for protein stability. Used to place the glycan. Not learned.
MODELLER — comparative (homology) structure modelling by satisfying spatial restraints. Optimization, not ML.
SCWRL / GROMACS / GeneOptimizer — rotamer-library side-chain packing, physics-based molecular dynamics, and a codon-optimization heuristic, respectively.
Not one of those is a Neural Netwrok or a trained predictive model  
 
# 5 HOW DOES THE CLAIM OF A UNIVERSAL VACCINE HOLD UP
From what I see the study somewhat overstates their initial claim. 
the honest summary is: the vaccine did induce antibodies that bind to RBD (basically saing the design landed) [microarray result], but those binding antibodies did not translate into a strong, broad neutralization in this trial (it worked not as good as expected) [neutralization assay result].
Worth noting this was fundamentally a Phase I safety/feasibility study, and on that primary endpoint it succeeded: no serious adverse events, all four doses well tolerated, fewer reactions after the second dose. The modest human DNA result is partly a delivery-platform ceiling (as they choose a DNA+Needle-free choice as delivery vehicle). the plattform-approach is a good idea and the pipeline to generate it is generalizable. the delivery-mechanism can be changed. So lets wait for what comes in the future. 
 
# SOURCES
https://www.nature.com/articles/s41551-023-01094-2
https://www.sciencedirect.com/science/article/pii/S0163445326000848
https://academic.oup.com/bioinformatics/article/21/5/676/220389
https://iqtree.github.io/
https://foldxsuite.crg.eu/
https://salilab.org/modeller/
https://www.ebi.ac.uk/jdispatcher/msa/muscle?stype=protein
https://dunbrack.fccc.edu/lab/scwrl
[RCSB PDB - 7YAD: Cryo-EM structure of S309-RBD-RBD-S309 in the S309-bound Omicron spike protein (loc…](https://www.rcsb.org/structure/7YAD)