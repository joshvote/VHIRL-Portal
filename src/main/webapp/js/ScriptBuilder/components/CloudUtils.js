/*
 * This file is part of the AuScope Virtual Exploration Geophysics Lab (VEGL) project.
 * Copyright (c) 2011 CSIRO Earth Science and Resource Engineering
 *
 * Licensed under the terms of the GNU Lesser General Public License.
 */
Ext.define('ScriptBuilder.components.CloudUtils', {
    extend : 'ScriptBuilder.components.BasePythonComponent',

    constructor: function(config) {
        Ext.apply(config, {
            bodyStyle: "padding:5px;",
            labelWidth: 150,
            defaults: { anchor: "100%" },
            items: [{
                xtype: "label",
                text: "Press OK to load these utility functions."
            }]
        });

        this.callParent(arguments);
    },

    /**
     * This is where we dynamically generate a python Getter/Setter class from the job object that
     * is sent to us
     */
    getScript : function() {
        var text = '';

        text += '# ----- Autogenerated AWS Utility Functions -----' + this._newLine;
        text += '# Uploads inFilePath (must be in the local directory) to the cloud' + this._newLine;
        text += 'def cloudUpload(inFilePath):' + this._newLine;
        text += this._tab + 'cloudBucket = os.environ["STORAGE_BUCKET"]' + this._newLine;
        text += this._tab + 'cloudDir = os.environ["STORAGE_BASE_KEY_PATH"]' + this._newLine;
        text += this._tab + 'cloudKey = inFilePath' + this._newLine;
        text += this._tab + 'queryPath = (cloudBucket + "/" + cloudDir + "/" + cloudKey).replace("//", "/")' + this._newLine;
        text += this._tab + 'retcode = subprocess.call(["cloud", "upload", cloudBucket,cloudDir,cloudKey, inFilePath, "--set-acl=public-read"])' + this._newLine;
        text += this._tab + 'print "cloudUpload: " + inFilePath + " to " + queryPath + " returned " + str(retcode)' + this._newLine;
        text += this._newLine;
        text += '# downloads a named file from this jobs cloud storage' + this._newLine;
        text += 'def cloudDownload(fileName):' + this._newLine;
        text += this._tab + 'cloudBucket = os.environ["STORAGE_BUCKET"]' + this._newLine;
        text += this._tab + 'cloudDir = os.environ["STORAGE_BASE_KEY_PATH"]' + this._newLine;
        text += this._tab + 'queryPath = (cloudBucket + "/" + cloudDir + "/" + fileName).replace("//", "/")' + this._newLine;
        text += this._tab + 'retcode = subprocess.call(["cloud", "download",cloudBucket,cloudDir,fileName, fileName])' + this._newLine;
        text += this._tab + 'print "cloudDownload: " + queryPath + " to " + fileName + " returned " + str(retcode)' + this._newLine;
        text += '# -----------------------------------------------' + this._newLine;
        text += this._newLine;

        return text;
    }
});
